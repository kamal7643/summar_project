"use client";

import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  FaEdit,
  FaTrash,
  FaUserPlus,
  FaEye,
  FaPlus,
  FaImage,
} from "react-icons/fa";
import { getLocalStorageItem } from "@/lib/localStorage";

type ContentItem = {
  type: "heading" | "subheading" | "paragraph" | "list" | "image";
  text?: string;
  imageUrl?: string;
  listItems?: string[];
};

type Article = {
  id: string;
  title: string;
  content: ContentItem[];
  views: number;
};

export default function Page() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<ContentItem[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const fetchArticles = () => {
    fetch("/api/user/article", {
      headers: {
        Authorization: "Bearer " + getLocalStorageItem("token", ""),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setArticles(data.data);
      });
  };
  useEffect(() => {
    // Fetch articles from API
    fetchArticles();
    // setArticles(fetchedArticles);
  }, []);

  const handleCreateArticle = () => {
    // API call to create article
    console.log("Creating article:", { title, content });
    fetch("/api/user/article/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getLocalStorageItem("token", ""),
      },
      body: JSON.stringify({
        title,
        content,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTitle("");
        setContent([]);
        fetchArticles();
      });
  };

  const handleEditArticle = (article: Article) => {
    setSelectedArticle(article);
    setOpenDialog(true);
  };

  const handleUpdateArticle = () => {
    // API call to update article
    console.log("Updating article:", selectedArticle);
    setOpenDialog(false);
  };

  const handleDeleteArticle = (articleId: string) => {
    // API call to delete article
    console.log("Deleting article:", articleId);
  };

  const handleUpdatePermissions = (articleId: string) => {
    // API call to update permissions
    console.log("Updating permissions for article:", articleId);
  };

  const handleAddContentItem = () => {
    setContent([...content, { type: "paragraph", text: "" }]);
  };

  const handleContentItemChange = (index: number, updatedItem: ContentItem) => {
    const newContent = [...content];
    newContent[index] = updatedItem;
    setContent(newContent);
  };

  const handleRemoveContentItem = (index: number) => {
    const newContent = content.filter((_, i) => i !== index);
    setContent(newContent);
  };

  const renderContentEditor = (contentToRender = content) => {
    return contentToRender.map((item, index) => (
      <div key={index} className="mb-4 p-2 border rounded">
        <Select
          value={item.type}
          onChange={(e) =>
            handleContentItemChange(index, {
              ...item,
              type: e.target.value as ContentItem["type"],
            })
          }
          className="mb-2"
        >
          <MenuItem value="heading">Heading</MenuItem>
          <MenuItem value="subheading">Subheading</MenuItem>
          <MenuItem value="paragraph">Paragraph</MenuItem>
          <MenuItem value="list">List</MenuItem>
          <MenuItem value="image">Image</MenuItem>
        </Select>
        {item.type !== "image" && (
          <TextField
            fullWidth
            multiline={item.type === "paragraph"}
            rows={item.type === "paragraph" ? 4 : 1}
            value={item.text || ""}
            onChange={(e) =>
              handleContentItemChange(index, { ...item, text: e.target.value })
            }
            className="mb-2"
          />
        )}
        {item.type === "image" && (
          <TextField
            fullWidth
            placeholder="Image URL"
            value={item.imageUrl || ""}
            onChange={(e) =>
              handleContentItemChange(index, {
                ...item,
                imageUrl: e.target.value,
              })
            }
            className="mb-2"
          />
        )}
        {item.type === "list" && (
          <List>
            {item.listItems?.map((listItem, listIndex) => (
              <ListItem key={listIndex}>
                <ListItemText
                  primary={
                    <TextField
                      fullWidth
                      value={listItem}
                      onChange={(e) => {
                        const newListItems = [...(item.listItems || [])];
                        newListItems[listIndex] = e.target.value;
                        handleContentItemChange(index, {
                          ...item,
                          listItems: newListItems,
                        });
                      }}
                    />
                  }
                />
              </ListItem>
            ))}
            <Button
              onClick={() =>
                handleContentItemChange(index, {
                  ...item,
                  listItems: [...(item.listItems || []), ""],
                })
              }
            >
              Add List Item
            </Button>
          </List>
        )}
        <Button
          onClick={() => handleRemoveContentItem(index)}
          color="secondary"
        >
          Remove
        </Button>
      </div>
    ));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Article Management</h1>

      {/* Create Article Form */}
      <div className="mb-8 bg-white p-4 rounded shadow flex flex-col">
        <h2 className="text-xl font-semibold mb-4">Create New Article</h2>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-4"
        />
        {renderContentEditor()}
        <Button
          variant="outlined"
          onClick={handleAddContentItem}
          startIcon={<FaPlus />}
          className="mb-4"
        >
          Add Content Item
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateArticle}
        >
          Create Article
        </Button>
      </div>

      {/* Article List */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Articles</h2>
        {articles.map((article) => (
          <div key={article.id} className="border-b py-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">{article.title}</h3>
              <div>
                <IconButton onClick={() => handleEditArticle(article)}>
                  <FaEdit />
                </IconButton>
                <IconButton onClick={() => handleDeleteArticle(article.id)}>
                  <FaTrash />
                </IconButton>
              </div>
            </div>
            <p className="text-gray-600 mt-2">
              {article.content
                .find((item) => item.type === "paragraph")
                ?.text?.substring(0, 100) || "No preview available"}
              ...
            </p>
            <div className="mt-2">
              <Chip
                icon={<FaEye />}
                label={`Views: ${article.views}`}
                className="mr-2"
              />
              <Chip
                icon={<FaUserPlus />}
                label="Manage Access"
                onClick={() => handleUpdatePermissions(article.id)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Edit Article Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Edit Article</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={selectedArticle?.title || ""}
            onChange={(e) =>
              setSelectedArticle(
                selectedArticle
                  ? { ...selectedArticle, title: e.target.value }
                  : null,
              )
            }
            className="mb-4 mt-2"
          />
          {selectedArticle && renderContentEditor(selectedArticle.content)}
          <Button
            variant="outlined"
            onClick={handleAddContentItem}
            startIcon={<FaPlus />}
            className="mb-4"
          >
            Add Content Item
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            onClick={handleUpdateArticle}
            variant="contained"
            color="primary"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
