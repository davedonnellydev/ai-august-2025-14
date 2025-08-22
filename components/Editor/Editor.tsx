'use client';
import {
  Button,
  Group,
  Stack,
  TextInput,
  Textarea,
  SegmentedControl,
  TagsInput,
} from '@mantine/core';
import { useState } from 'react';
import MarkdownIt from 'markdown-it';
import DOMPurify from 'isomorphic-dompurify';

const md = new MarkdownIt();

export function Editor({
  initial,
  onSave,
}: {
  initial?: any;
  onSave: (payload: any) => Promise<void>;
}) {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [summary, setSummary] = useState(initial?.summary ?? '');
  const [tags, setTags] = useState<string[]>(
    initial?.tags_csv?.split(',').filter(Boolean) ?? []
  );
  const [status, setStatus] = useState<'draft' | 'published'>(
    initial?.status ?? 'draft'
  );
  const [content, setContent] = useState(initial?.content_md ?? '');
  const [tab, setTab] = useState<'edit' | 'preview'>('edit');
  const [aiLoading, setAiLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const html = DOMPurify.sanitize(md.render(content));

  async function ai(action: string, extras?: Record<string, string>) {
    setAiLoading(true);
    const res = await fetch('/api/openai/assist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, topic: title, text: content, ...extras }),
    });
    const result = await res.json();
    console.log(result.response);
    setAiLoading(false);
    if (action === 'outline' || action === 'expand' || action === 'rewrite') {
      setContent((prev: string) => prev + (prev ? '\n\n' : '') + result.response);
    } else if (action === 'summary') {
      const [first, ...rest] = result.response.split('\n').filter(Boolean);
      setSummary(first.replace(/^Summary:\s*/i, '').trim());
    }
  }

  const handleSave = async (payload: any) => {
    try {
      setError(null);
      await onSave(payload);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save post');
    }
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
      {/* Editor */}
      <Stack className="col-span-8">
        <TextInput
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
        <TagsInput
          label="Tags"
          value={tags}
          onChange={setTags}
          placeholder="ai, nextjs, typescript"
        />
        <TextInput
          label="Summary"
          value={summary}
          onChange={(e) => setSummary(e.currentTarget.value)}
        />
        <SegmentedControl
          value={tab}
          onChange={(v: any) => setTab(v)}
          data={[
            { label: 'Edit', value: 'edit' },
            { label: 'Preview', value: 'preview' },
          ]}
        />
        {tab === 'edit' ? (
          <Textarea
            autosize
            minRows={16}
            value={content}
            onChange={(e) => setContent(e.currentTarget.value)}
          />
        ) : (
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}
        <Group justify="space-between">
          <SegmentedControl
            value={status}
            onChange={(v: any) => setStatus(v)}
            data={[
              { label: 'Draft', value: 'draft' },
              { label: 'Published', value: 'published' },
            ]}
          />
          <Group>
            <Button
              variant="default"
              onClick={() => ai('summary')}
              loading={aiLoading}
            >
              AI: Summary/SEO
            </Button>
            <Button
              onClick={() =>
                handleSave({
                  title,
                  summary,
                  tags,
                  content_md: content,
                  status,
                })
              }
            >
              Save
            </Button>
          </Group>
        </Group>
      </Stack>
      {/* AI panel */}
      <Stack className="col-span-4">
        <Button onClick={() => ai('outline')} loading={aiLoading}>
          AI: Outline
        </Button>
        <Button onClick={() => ai('expand')} loading={aiLoading}>
          AI: Continue/Expand
        </Button>
        <Button
          onClick={() => ai('rewrite', { tone: 'friendly and clear' })}
          loading={aiLoading}
        >
          AI: Rewrite (friendly)
        </Button>
        <Button onClick={() => ai('title')} loading={aiLoading}>
          AI: Titles & Slug Ideas
        </Button>
      </Stack>
    </div>
  );
}
