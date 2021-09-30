import { render, waitFor } from "@testing-library/react";
import mockAxios from "../../__mocks__/axios";
import { BrowserRouter } from "react-router-dom";
import Authors from "../../author/Authors";

describe("getAllAuthors", () => {
    afterEach(() => {
        mockAxios.reset();
    });

    describe("when API call is successful", () => {


        it("render without data", async () => {
            const resp = { data: null };

            mockAxios.get.mockResolvedValueOnce(resp);
            const { getByText } = render(<BrowserRouter>
                <Authors />
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
                <Authors />
            </BrowserRouter>);
            const articleName = await waitFor(() => getByText("Donatello"));
            const createButton = await waitFor(() => getByText("Maxim Velik"));
            const secondArticle = await waitFor(() => getByText("create new author"));
            expect(articleName).toBeInTheDocument;
            expect(createButton).toBeInTheDocument;
            expect(secondArticle).toBeInTheDocument;
        });
    });
});
