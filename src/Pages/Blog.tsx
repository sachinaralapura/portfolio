import {
  Alert,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Link,
  Paper,
  styled,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // Recommended for GitHub Flavored Markdown (tables, etc.)
import blogMeta from "../Posts/blogmeta.json";

// --- Define the BlogPost interface (matching blogmeta.json structure) ---
interface BlogPost {
  slug: string; // Crucial: used to link metadata to markdown file
  title: string;
  tags: string[];
  date: string;
  image?: string;
}

// --- Use import.meta.glob to find all .md files and prepare dynamic imports ---
// This gets an object where keys are paths and values are FUNCTIONS that return Promises
const markdownModules = import.meta.glob("../Posts/*.md", {
  query: "?raw", // Import the raw string content
  import: "default", // We want the default export (the string itself)
  eager: false, // Load dynamically (important!)
});

// --- Create a map for easy lookup: slug -> async function loading markdown string ---
const markdownLoaders: Record<string, () => Promise<string>> = {};
for (const path in markdownModules) {
  // Extract 'useRef' from '../Posts/useRef.md'
  const slug = path.split("/").pop()?.replace(".md", "");
  if (slug && slug !== "blogmeta.json" && slug !== "index") {
    // Avoid non-markdown files if necessary
    markdownLoaders[slug] = markdownModules[path] as () => Promise<string>;
  }
}
console.log("Markdown Loaders Initialized:", markdownLoaders); // Debugging line

// --- Assume blogMeta directly provides the list of posts ---
const posts: BlogPost[] = blogMeta;

export function BlogGrid() {
  const [open, setOpen] = useState(false);
  // Store the metadata of the post selected for the dialog
  const [selectedPostMeta, setSelectedPostMeta] = useState<BlogPost | null>(
    null
  );
  // Store the dynamically loaded markdown content string
  const [loadedMarkdown, setLoadedMarkdown] = useState<string | null>(null);
  // State to track if markdown is currently being loaded
  const [isLoadingMarkdown, setIsLoadingMarkdown] = useState<boolean>(false);
  // State to store any errors during loading
  const [markdownError, setMarkdownError] = useState<string | null>(null);

  const handleOpen = async (post: BlogPost) => {
    // 1. Set the metadata for the dialog title, tags, etc.
    setSelectedPostMeta(post);
    // 2. Reset previous state and set loading flag
    setLoadedMarkdown(null);
    setMarkdownError(null);
    setIsLoadingMarkdown(true);
    setOpen(true); // Open the dialog now

    // 3. Find the correct loader function based on the post's slug
    const loader = markdownLoaders[post.slug];
    if (loader) {
      try {
        // 4. Dynamically import the markdown content (await the promise)
        const content = await loader();
        setLoadedMarkdown(content);
      } catch (error) {
        console.error(
          `Failed to load markdown for slug "${post.slug}":`,
          error
        );
        setMarkdownError(`Failed to load content for "${post.title}".`);
      } finally {
        // 5. Clear loading state regardless of success or failure
        setIsLoadingMarkdown(false);
      }
    } else {
      console.error(`No markdown loader found for slug: ${post.slug}`);
      setMarkdownError(`Content file not found for "${post.title}".`);
      setIsLoadingMarkdown(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    // Consider resetting states after the dialog closes (or on open)
    setSelectedPostMeta(null);
    setLoadedMarkdown(null);
    setIsLoadingMarkdown(false);
    setMarkdownError(null);
  };

  interface MarkdownComponentProps {
    node?: any; // Or a more specific type if you have it
    ordered?: boolean;
    inline?: boolean;
    className?: string;
    children?: React.ReactNode;
    [key: string]: any; // Allow other props
  }

  // --- Optional: Styled components for code blocks using MUI's system ---
  const CodeBlock = styled("pre")(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === "dark" ? "#272822" : theme.palette.grey[100],
    padding: theme.spacing(1.5),
    borderRadius: theme.shape.borderRadius,
    overflowX: "auto",
    fontFamily: "monospace",
    fontSize: "0.875rem",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  }));

  const InlineCode = styled("code")(({ theme }) => ({
    backgroundColor: theme.palette.action.hover,
    padding: "0.1em 0.3em",
    borderRadius: theme.shape.borderRadius * 0.5,
    fontFamily: "monospace",
    fontSize: "inherit", // Inherit font size from surrounding text
  }));

  // --- Define MUI component mapping for ReactMarkdown ---
  const markdownComponents = {
    p: ({ node, ...props }: MarkdownComponentProps) => (
      <Typography variant="body1" paragraph {...props} />
    ),
    h1: ({ node, ...props }: MarkdownComponentProps) => (
      <Typography variant="h4" gutterBottom sx={{ mt: 3 }} {...props} />
    ),
    h2: ({ node, ...props }: MarkdownComponentProps) => (
      <Typography variant="h5" gutterBottom sx={{ mt: 2.5 }} {...props} />
    ),
    h3: ({ node, ...props }: MarkdownComponentProps) => (
      <Typography variant="h6" gutterBottom sx={{ mt: 2 }} {...props} />
    ),
    h4: ({ node, ...props }: MarkdownComponentProps) => (
      <Typography
        variant="subtitle1"
        gutterBottom
        sx={{ mt: 1.5 }}
        {...props}
      />
    ),
    li: (
      { node, ordered, ...props }: MarkdownComponentProps // Pass ordered prop if needed
    ) => (
      <li>
        <Typography variant="body1" component="span" {...props} />
      </li>
    ),
    a: ({ node, ...props }: MarkdownComponentProps) => (
      <Link target="_blank" rel="noopener noreferrer" {...props} />
    ), // Open links in new tab
    blockquote: ({ node, ...props }: MarkdownComponentProps) => (
      <Paper
        elevation={0}
        sx={{
          borderLeft: 4,
          borderColor: "divider",
          pl: 2,
          my: 1.5,
          fontStyle: "italic",
        }}
      >
        <Typography variant="body1" {...props} />
      </Paper>
    ),
    hr: ({ node, ...props }: MarkdownComponentProps) => (
      <Divider sx={{ my: 2 }} {...props} />
    ),
    pre: ({ node, ...props }: MarkdownComponentProps) => (
      <CodeBlock {...props} />
    ), // Use styled component for block code
    code({
      node,
      inline,
      className,
      children,
      ...props
    }: MarkdownComponentProps) {
      // Handle both inline and block code
      // For block code, react-markdown wraps <code> in <pre>. Our `pre` mapping handles styling.
      // For inline code, use the InlineCode styled component.
      return inline ? (
        <InlineCode className={className} {...props}>
          {children}
        </InlineCode>
      ) : (
        // Let the `pre` mapping handle the block styling, just render the code tag itself
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
    // Add mappings for table, thead, tbody, tr, th, td using MUI Table components if needed
  };

  return (
    <Container maxWidth={false} sx={{ pt: 10, height: "calc(100vh - 64px)" }}>
      <Grid container spacing={3} padding={2}>
        {posts.map((post, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card
              sx={{
                // bgcolor: isDarkMode ? "#f5f5f5" : "#1c1c1e",
                // color: isDarkMode ? "black" : "white",
                height: "100%",
              }}
            >
              <CardActionArea onClick={() => handleOpen(post)}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {post.title}
                  </Typography>
                  <div style={{ marginBottom: 8 }}>
                    {post.tags.map((tag, i) => (
                      <Chip
                        key={i}
                        label={`#${tag}`}
                        size="small"
                        sx={{
                          marginRight: 0.5,
                        }}
                      />
                    ))}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: 12,
                    }}
                  >
                    {/* <div style={{ marginLeft: "auto" }}>
                      <IconButton size="small">
                        <BookmarkBorderIcon fontSize="small" />
                      </IconButton>
                    </div> */}
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* --- Dialog to display the selected post content --- */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        scroll="paper"
      >
        {" "}
        {/* Use scroll="paper" for long content */}
        <DialogTitle fontWeight={"bold"}>{selectedPostMeta?.title}</DialogTitle>
        {/* Use dividers prop for better visual separation */}
        <DialogContent dividers>
          {/* Display metadata within the dialog */}
          {selectedPostMeta && (
            <Box sx={{ mb: 2 }}>
              {/* <Typography variant="body2" color="text.secondary" gutterBottom>
                {selectedPostMeta.date}
              </Typography> */}
              {/* {selectedPostMeta.tags.map((tag, i) => (
                <Chip
                  key={i}
                  label={`#${tag}`}
                  size="small"
                  sx={{ marginRight: 0.5, mb: 0.5 }}
                />
              ))} */}
            </Box>
          )}
          {/* --- Conditional Rendering based on loading state --- */}
          {isLoadingMarkdown && (
            // Show a loading spinner centered
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "200px",
              }}
            >
              <CircularProgress />
            </Box>
          )}

          {markdownError && (
            // Show an error message
            <Alert severity="error">{markdownError}</Alert>
          )}

          {!isLoadingMarkdown && !markdownError && loadedMarkdown && (
            // Render the markdown content ONLY if loaded and no error
            <ReactMarkdown
              children={loadedMarkdown}
              remarkPlugins={[remarkGfm]} // Enable GFM features like tables
              components={markdownComponents}
            />
          )}
        </DialogContent>
        {/* Consider adding a DialogActions section with a Close button */}
      </Dialog>
    </Container>
  );
}
