import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Alert,
} from "@mui/material";

import Grid from "@mui/material/Grid";

import api from "./services/api";

import ScrapeForm from "./components/ScrapeForm";
import ScrapeTable from "./components/ScrapeTable";

function App() {
  const [scrapes, setScrapes] = useState([]);

  const [message, setMessage] = useState("");

  const [messageType, setMessageType] =
    useState("success");

  const loadScrapes = async () => {
    try {
      const response = await api.get(
        "/scrapes"
      );

      setScrapes(response.data);
    } catch (error) {
      console.error(error);

      setMessageType("error");

      setMessage(
        "Failed to load scrape history."
      );
    }
  };

  useEffect(() => {
    loadScrapes();
  }, []);

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage("");
    }, 4000);

    return () => clearTimeout(timer);
  }, [message]);

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 4,
        mb: 4,
      }}
    >
      <Typography
        align="center"
        color="primary"
        sx={{
          fontSize: {
            xs: "2rem",
            md: "3rem",
          },
          fontWeight: "bold",
          mb: 3,
        }}
      >
        ScrapeFlow AI
      </Typography>

      {message && (
        <Alert
          severity={
            messageType === "success"
              ? "success"
              : "error"
          }
          sx={{ mb: 3 }}
        >
          {message}
        </Alert>
      )}

      <Grid
        container
        spacing={3}
        sx={{ mb: 3 }}
      >
        <Grid
          size={{
            xs: 12,
            md: 4,
          }}
        >
          <Card>
            <CardContent>
              <Typography variant="h6">
                Total Scrapes
              </Typography>

              <Typography
                sx={{
                  fontSize: {
                    xs: "2rem",
                    md: "3rem",
                  },
                  fontWeight: "bold",
                }}
              >
                {scrapes.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 4,
          }}
        >
          <Card>
            <CardContent>
              <Typography variant="h6">
                Analyzer Status
              </Typography>

              <Typography
                sx={{
                  fontSize: {
                    xs: "1.8rem",
                    md: "2.5rem",
                  },
                  fontWeight: "bold",
                  color: "success.main",
                }}
              >
                Active
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 4,
          }}
        >
          <Card>
            <CardContent>
              <Typography variant="h6">
                Dashboard
              </Typography>

              <Typography
                sx={{
                  fontSize: {
                    xs: "1.5rem",
                    md: "2rem",
                  },
                  fontWeight: "bold",
                  color: "primary.main",
                }}
              >
                Responsive
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mb={4}>
        <ScrapeForm
          onScrapeSuccess={
            loadScrapes
          }
          setMessage={
            setMessage
          }
          setMessageType={
            setMessageType
          }
        />
      </Box>

      <Card>
        <CardContent>
          <Typography
            variant="h5"
            mb={2}
          >
            Scrape History
          </Typography>

          <ScrapeTable
            scrapes={scrapes}
            onDeleteSuccess={
              loadScrapes
            }
            setMessage={
              setMessage
            }
            setMessageType={
              setMessageType
            }
          />
        </CardContent>
      </Card>
    </Container>
  );
}

export default App;