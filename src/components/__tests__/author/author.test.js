import { render, waitFor } from "@testing-library/react";
import mockAxios from "../../__mocks__/axios";
import { BrowserRouter } from "react-router-dom";
import AuthorPage from "../../author/AuthorPage";

describe("getAllArticles", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  describe("test author page render", () => {

    it("render without data", async () => {
      const resp = { data: null };

      mockAxios.get.mockResolvedValueOnce(resp);
      const { getByText } = render(<BrowserRouter>
        <AuthorPage />
      </BrowserRouter>);
      const articleName = await waitFor(() => getByText("Downloading..."));
      expect(articleName).toBeInTheDocument;
    });

    it("render with data", async () => {

      const resp = {
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
      mockAxios.get.mockResolvedValueOnce(resp);

      const { getByText } = render(<BrowserRouter>
        <AuthorPage />
      </BrowserRouter>);
      const createButton = await waitFor(() => getByText("Edit menu"));
      const secondArticle = await waitFor(() => getByText("Edit menu"));
      expect(createButton).toBeInTheDocument;
      expect(secondArticle).toBeInTheDocument;
    });
  });
});
