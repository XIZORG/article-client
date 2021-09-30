import { render, waitFor } from "@testing-library/react";
import mockAxios from "../../__mocks__/axios";
import { BrowserRouter } from "react-router-dom";
import ArticlePage from "../../article/articlePage/ArticlePage";

describe("getAllArticles", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  describe("when API call is successful", () => {

    it("render without data", async () => {
      const resp = { data: null };

      mockAxios.get.mockResolvedValueOnce(resp);
      mockAxios.get.mockResolvedValueOnce(resp);
      const { getByText } = render(<BrowserRouter>
        <ArticlePage />
      </BrowserRouter>);
      const articleName = await waitFor(() => getByText("Downloading..."));
      expect(articleName).toBeInTheDocument;
    });

    it("render with data", async () => {

      const resp1 = {
        data: [
          {
            "name": "Maxim Velik",
            "id": 7
          },
          {
            "name": "Donatello",
            "id": 6
          },
          {
            "name": "Mike",
            "id": 3
          }
        ]
      };
      mockAxios.get.mockResolvedValueOnce(resp1);

      const resp2 = {
        data: {
          "description": "string",
          "name": "string",
          "id": 10,
          "authors": [
            {
              "id": 7,
              "name": "Maxim Velik"
            },
            {
              "id": 11,
              "name": "egegge"
            },
            {
              "id": 6,
              "name": "Donatello"
            }
          ]
        }
      };
      mockAxios.get.mockResolvedValueOnce(resp2);

      const { getByText } = render(<BrowserRouter>
        <ArticlePage />
      </BrowserRouter>);
      const createButton = await waitFor(() => getByText("Authors:"));
      const secondArticle = await waitFor(() => getByText("Edit menu"));
      expect(createButton).toBeInTheDocument;
      expect(secondArticle).toBeInTheDocument;
    });
  });
});
