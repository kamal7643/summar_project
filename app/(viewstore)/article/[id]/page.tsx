"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getLocalStorageItem } from "@/lib/localStorage";
import { CircularProgress, Typography, Chip } from "@mui/material";
import { FaEye, FaUser } from "react-icons/fa";
import Image from "next/image";

type ContentItem = {
  type: "heading" | "subheading" | "paragraph" | "list" | "image";
  text?: string;
  imageUrl?: string;
  listItems?: string[];
};

type Article = {
  _id: string;
  title: string;
  content: ContentItem[];
  views: number;
  author: {
    _id: string;
    name: string;
  };
  admins: string[];
};

export default function ArticlePage() {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const { id } = params;

  const fetchArticle = async () => {
    try {
      const response = await fetch(`/api/article?article_id=${id}`, {
        headers: {
          Authorization: "Bearer " + getLocalStorageItem("token", ""),
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch article");
      }

      const data = await response.json();
      setArticle(data.article);
      setLoading(false);
    } catch (err) {
      setError("Error fetching article");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error || !article) {
    return (
      <Typography color="error">{error || "Article not found"}</Typography>
    );
  }

  const renderContent = (content: ContentItem) => {
    switch (content.type) {
      case "heading":
        return <Typography variant="h2">{content.text}</Typography>;
      case "subheading":
        return <Typography variant="h4">{content.text}</Typography>;
      case "paragraph":
        return <Typography paragraph>{content.text}</Typography>;
      case "list":
        return (
          <ul>
            {content.listItems?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        );
      case "image":
        return (
          <Image
            // src={content.imageUrl || ""}
            src=""
            alt="Article content"
            style={{ maxWidth: "100%" }}
            width={100}
            height={100}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Typography variant="h1" gutterBottom>
        {article.title}
      </Typography>
      <div className="flex items-center space-x-2 mb-4">
        <Chip icon={<FaUser />} label={article.author.name} />
        <Chip icon={<FaEye />} label={`Views: ${article.views}`} />
      </div>
      {article.content.map((item, index) => (
        <div key={index} className="mb-4">
          {renderContent(item)}
        </div>
      ))}
    </div>
  );
}
