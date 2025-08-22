import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const posts = sqliteTable("posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  slug: text("slug").unique().notNull(),
  summary: text("summary").default(""),
  content_md: text("content_md").notNull(),          // markdown source
  content_html: text("content_html").default(""),    // optional cached render
  tags_csv: text("tags_csv").default(""),            // "ai,nextjs,typescript"
  status: text("status", { enum: ["draft", "published"] }).notNull().default("draft"),
  published_at: integer("published_at", { mode: "timestamp_ms" }),
  created_at: integer("created_at", { mode: "timestamp_ms" })
    .notNull().default(sql`(unixepoch('subsec') * 1000)`),
  updated_at: integer("updated_at", { mode: "timestamp_ms" })
    .notNull().default(sql`(unixepoch('subsec') * 1000)`),
});
