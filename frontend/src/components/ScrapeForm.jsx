import { useState } from "react";

import {
  TextField,
  Button,
  Stack,
} from "@mui/material";

import api from "../services/api";

function ScrapeForm({
  onScrapeSuccess,
  setMessage,
  setMessageType,
}) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] =
    useState(false);

  const handleScrape = async () => {
    if (!url.trim()) {
      setMessageType("error");

      setMessage(
        "Please enter a website URL."
      );

      return;
    }

    try {
      setLoading(true);

      await api.post("/scrape", {
        url: url.trim(),
      });

      setUrl("");

      setMessageType("success");

      setMessage(
        "Website analyzed successfully."
      );

      onScrapeSuccess();
    } catch (error) {
      console.error(error);

      setMessageType("error");

      setMessage(
        error?.response?.data?.error ||
          "Scraping failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleScrape();
      }}
    >
      <Stack
        direction={{
          xs: "column",
          md: "row",
        }}
        spacing={2}
        sx={{
          width: "100%",
        }}
      >
        <TextField
          fullWidth
          label="Enter Website URL"
          placeholder="https://example.com"
          value={url}
          onChange={(e) =>
            setUrl(e.target.value)
          }
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              !loading
            ) {
              e.preventDefault();
              handleScrape();
            }
          }}
        />

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{
            minWidth: "180px",
            height: "56px",
            fontWeight: "bold",

            width: {
              xs: "100%",
              sm: "220px",
              md: "180px",
            },

            alignSelf: {
              xs: "stretch",
              md: "center",
            },
          }}
        >
          {loading
            ? "Analyzing..."
            : "Analyze"}
        </Button>
      </Stack>
    </form>
  );
}

export default ScrapeForm;