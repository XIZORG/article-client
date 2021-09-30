import { render, waitFor } from "@testing-library/react";
import mockAxios from "../../__mocks__/axios";
import { BrowserRouter } from "react-router-dom";
import ArticleUpdatePage from "../../article/ArticleUpdatePage";

describe("getAllArticles", () => {
    afterEach(() => {
        mockAxios.reset();
    });

    describe("when API call is successful", () => {

        it("render without data", async () => {
            const resp = { data: null };

            mockAxios.get.mockResolvedValueOnce(resp);
            const { getByText } = render(<BrowserRouter>
                <ArticleUpdatePage />
            </BrowserRouter>);
            const articleName = await waitFor(() => getByText("Downloading..."));
            expect(articleName).toBeInTheDocument;
        });

        it("render with data", async () => {
            const resp = {
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
                  }};

            mockAxios.get.mockResolvedValueOnce(resp);
            const { getByText } = render(<BrowserRouter>
                <ArticleUpdatePage />
            </BrowserRouter>);
            const articleName = await waitFor(() => getByText("Authors:"));
            const createButton = await waitFor(() => getByText("update"));
            expect(articleName).toBeInTheDocument;
            expect(createButton).toBeInTheDocument;
        });
    });
});
