import { render, waitFor } from "@testing-library/react";
import ArticlesPage from "../../article/ArticlesPage";
import mockAxios from "../../__mocks__/axios";
import { BrowserRouter } from "react-router-dom";

describe("getAllArticles", () => {
    afterEach(() => {
        mockAxios.reset();
    });

    describe("when API call is successful", () => {

        it("render without data", async () => {
            const resp = { data: null };

            mockAxios.get.mockResolvedValueOnce(resp);
            const { getByText } = render(<BrowserRouter>
                <ArticlesPage />
            </BrowserRouter>);
            const articleName = await waitFor(() => getByText("Downloading..."));
            expect(articleName).toBeInTheDocument;
        });

        it("render with data", async () => {
            const resp = {
                data: [
                    {
                        "description": "string",
                        "name": "string",
                        "id": 10,
                        "authors": [
                            {
                                "id": 4,
                                "name": "Bethoven"
                            },
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
                    },
                    {
                        "description": "some words bla bla bal",
                        "name": "Java",
                        "id": 11,
                        "authors": [
                            {
                                "id": 3,
                                "name": "Mike"
                            },
                            {
                                "id": 7,
                                "name": "Maxim Velik"
                            }
                        ]
                    }
                ]
            };
            mockAxios.get.mockResolvedValueOnce(resp);
            const { getByText } = render(<BrowserRouter>
                <ArticlesPage />
            </BrowserRouter>);
            const articleName = await waitFor(() => getByText("Java"));
            const createButton = await waitFor(() => getByText("create new article"));
            const secondArticle = await waitFor(() => getByText("string"));
            expect(articleName).toBeInTheDocument;
            expect(createButton).toBeInTheDocument;
            expect(secondArticle).toBeInTheDocument;
        });
    });
});
