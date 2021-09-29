import { render, waitFor } from "@testing-library/react";
import ArticlesPage from "../article/ArticlesPage";
import mockAxios from "../__mocks__/axios";
import { BrowserRouter } from "react-router-dom";

describe("getAllArticles", () => {
    afterEach(() => {
        mockAxios.reset();
    });

    describe("when API call is successful", () => {

        it("decrements count delayed", async () => {
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
            const countSpan = await waitFor(() => getByText("Java"));
            expect(countSpan).toBeInTheDocument;
        });
    });
});
