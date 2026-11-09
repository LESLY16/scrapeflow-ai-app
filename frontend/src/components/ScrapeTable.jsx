import { useState } from "react";

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";

import DeleteIcon from "@mui/icons-material/Delete";

import api from "../services/api";

function ScrapeTable({
  scrapes,
  onDeleteSuccess,
  setMessage,
  setMessageType,
}) {
  const [deleteId, setDeleteId] =
    useState(null);

  const [selectedScrape, setSelectedScrape] =
    useState(null);

  const theme = useTheme();

  const fullScreen =
    useMediaQuery(
      theme.breakpoints.down("sm")
    );

  const handleDelete = async (id) => {
    try {
      await api.delete(
        `/scrapes/${id}`
      );

      setMessageType("success");

      setMessage(
        "Record deleted successfully."
      );

      onDeleteSuccess();
    } catch (error) {
      console.error(error);

      setMessageType("error");

      setMessage(
        "Failed to delete record."
      );
    }
  };

  return (
    <>
      {deleteId && (
        <div
          style={{
            background:
              "#fff8e1",
            border:
              "1px solid #ffc107",
            padding: "15px",
            borderRadius:
              "8px",
            marginBottom:
              "20px",
          }}
        >
          <strong>
            Confirm Delete
          </strong>

          <p>
            Delete this scrape
            record?
          </p>

          <Button
            color="error"
            variant="contained"
            onClick={() => {
              handleDelete(
                deleteId
              );

              setDeleteId(
                null
              );
            }}
          >
            Yes Delete
          </Button>

          <Button
            sx={{ ml: 2 }}
            onClick={() =>
              setDeleteId(
                null
              )
            }
          >
            Cancel
          </Button>
        </div>
      )}

      <TableContainer
        sx={{
          overflowX: "auto",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                ID
              </TableCell>

              <TableCell>
                Title
              </TableCell>

              <TableCell
                sx={{
                  display: {
                    xs: "none",
                    md: "table-cell",
                  },
                }}
              >
                URL
              </TableCell>

              <TableCell>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {scrapes.map(
              (item) => (
                <TableRow
                  key={item.id}
                >
                  <TableCell>
                    {item.id}
                  </TableCell>

                  <TableCell>
                    {item.title}
                  </TableCell>

                  <TableCell
                    sx={{
                      display: {
                        xs: "none",
                        md: "table-cell",
                      },
                    }}
                  >
                    {item.url}
                  </TableCell>

                  <TableCell>
                    <Stack
                      direction={{
                        xs: "column",
                        md: "row",
                      }}
                      spacing={1}
                    >
                      <Button
                        variant="contained"
                        onClick={() =>
                          setSelectedScrape(
                            item
                          )
                        }
                      >
                        View
                      </Button>

                      <Button
                        color="error"
                        variant="contained"
                        startIcon={
                          <DeleteIcon />
                        }
                        onClick={() =>
                          setDeleteId(
                            item.id
                          )
                        }
                      >
                        Delete
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={Boolean(
          selectedScrape
        )}
        onClose={() =>
          setSelectedScrape(
            null
          )
        }
        fullScreen={
          fullScreen
        }
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          Scrape Details
        </DialogTitle>

        <DialogContent>
          {selectedScrape && (
            <>
              <Typography
                variant="h6"
              >
                Title
              </Typography>

              <Typography mb={2}>
                {
                  selectedScrape.title
                }
              </Typography>

              <Typography
                variant="h6"
              >
                URL
              </Typography>

              <Typography mb={2}>
                {
                  selectedScrape.url
                }
              </Typography>

              <Typography
                variant="h6"
              >
                Headings
              </Typography>

              <div
                style={{
                  background:
                    "#f5f5f5",
                  padding:
                    "12px",
                  borderRadius:
                    "8px",
                  maxHeight:
                    "300px",
                  overflowY:
                    "auto",
                }}
              >
                {selectedScrape.headings ? (
                  selectedScrape.headings
                    .split("\n")
                    .map(
                      (
                        heading,
                        index
                      ) => (
                        <div
                          key={
                            index
                          }
                        >
                          •{" "}
                          {
                            heading
                          }
                        </div>
                      )
                    )
                ) : (
                  <Typography>
                    No headings
                    found.
                  </Typography>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ScrapeTable;