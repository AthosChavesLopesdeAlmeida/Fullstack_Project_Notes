import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"

const Section = ({
  title,
  description,
  code,
  preview,
}: {
  title: string
  description?: string
  code: string
  preview?: React.ReactNode
}) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-lg">{title}</CardTitle>
      {description && (
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      )}
    </CardHeader>
    <CardContent className={preview ? "grid sm:grid-cols-2 gap-4" : ""}>
      <pre className="bg-muted rounded-md p-4 text-sm overflow-x-auto">
        <code>{code}</code>
      </pre>
      {preview && (
        <div className="rounded-md border p-4 text-sm flex flex-col justify-center">
          {preview}
        </div>
      )}
    </CardContent>
  </Card>
)

export default function GuidePage() {
  return (
    <div className="max-w-3xl mx-auto p-8 space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">How to write your notes in Markdown</h1>
        <p className="text-muted-foreground">
          KeepInMind uses Markdown to format your notes. You don&apos;t need to
          memorize anything — most of it is intuitive, and this guide covers
          everything that&apos;s supported.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          title="Headings"
          description="Use # at the start of a line. The more #, the smaller the heading."
          code={`# Big heading
## Medium heading
### Small heading`}
          preview={
            <div className="space-y-1">
              <p className="text-xl font-bold">Big heading</p>
              <p className="text-lg font-bold">Medium heading</p>
              <p className="text-base font-semibold">Small heading</p>
            </div>
          }
        />

        <Section
          title="Bold and italic"
          code={`**This is bold**
*This is italic*
***This is bold and italic***`}
          preview={
            <p>
              <span className="font-bold">This is bold</span>
              <br />
              <span className="italic">This is italic</span>
              <br />
              <span className="font-bold italic">This is bold and italic</span>
            </p>
          }
        />

        <Section
          title="Line breaks"
          description="Press Enter once to break the line. Leave a blank line between texts to start a new paragraph."
          code={`This line
breaks right below.

This is a separate paragraph.`}
        />

        <Section
          title="Lists"
          description="Simple lists use a dash. Indent with two spaces for a sub-item."
          code={`- First item
- Second item
  - Sub-item
- Third item`}
          preview={
            <ul className="list-disc list-inside space-y-1">
              <li>First item</li>
              <li>Second item</li>
              <ul className="list-disc list-inside ml-4">
                <li>Sub-item</li>
              </ul>
              <li>Third item</li>
            </ul>
          }
        />

        <Section
          title="Numbered lists"
          code={`1. First step
2. Second step
3. Third step`}
          preview={
            <ol className="list-decimal list-inside space-y-1">
              <li>First step</li>
              <li>Second step</li>
              <li>Third step</li>
            </ol>
          }
        />

        <Section
          title="Task lists"
          description="Mark things as done or pending."
          code={`- [x] Done task
- [ ] Pending task`}
          preview={
            <div className="space-y-1">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked readOnly /> Done task
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" readOnly /> Pending task
              </label>
            </div>
          }
        />

        <Section
          title="Links"
          code={`[Link text](https://example.com)`}
          preview={<a className="text-blue-500 underline" href="#">Link text</a>}
        />

        <Section
          title="Inline code"
          description="Wrap a word or short snippet in a single backtick."
          code={`Use the \`npm install\` command to install.`}
          preview={
            <p>
              Use the <code className="bg-background px-1 py-0.5 rounded text-sm font-mono">npm install</code> command to install.
            </p>
          }
        />

        <Section
          title="Code blocks"
          description="Wrap a larger block of code in three backticks, on their own lines."
          code={`\`\`\`
function example() {
  console.log("code block")
}
\`\`\``}
        />

        <Section
          title="Quotes"
          description="Use > at the start of a line to highlight a passage."
          code={`> This appears as a quote.`}
          preview={
            <blockquote className="border-l-4 border-muted pl-4 italic">
              This appears as a quote.
            </blockquote>
          }
        />

        <Section
          title="Tables"
          code={`| Column A | Column B |
|----------|----------|
| Value 1  | Value 2  |
| Value 3  | Value 4  |`}
          preview={
            <table className="text-sm w-full">
              <thead>
                <tr>
                  <th className="text-left border-b pb-1">Column A</th>
                  <th className="text-left border-b pb-1">Column B</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Value 1</td>
                  <td>Value 2</td>
                </tr>
                <tr>
                  <td>Value 3</td>
                  <td>Value 4</td>
                </tr>
              </tbody>
            </table>
          }
        />

        <Section
          title="Strikethrough"
          code={`~~This appears struck through~~`}
          preview={<p className="line-through">This appears struck through</p>}
        />
      </div>

      <Card className="bg-muted/50">
        <CardContent className="pt-6 text-sm text-muted-foreground">
          Tip: if a note gets too big on the main screen, it gets cut off — click it to see the full content.
        </CardContent>
      </Card>
    </div>
  )
}