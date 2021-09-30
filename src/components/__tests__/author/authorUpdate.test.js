import { render, waitFor } from "@testing-library/react";
import mockAxios from "../../__mocks__/axios";
import { BrowserRouter } from "react-router-dom";
import AuthorUpdatePage from "../../author/AuthorUpdatePage";

describe("getAllArticles", () => {
    afterEach(() => {
        mockAxios.reset();
    });

    describe("when API call is successful", () => {

        it("decrements count delayed", async () => {
            const resp = {
                data: {
                    "name": "woskalin",
                    "id": 9,
                    "articles": [
                      {
                        "id": 14,
                        "name": "lolo",
                        "description": "lolo"
                      }
                    ]
                  }};

            mockAxios.get.mockResolvedValueOnce(resp);
            const { getByText } = render(<BrowserRouter>
                <AuthorUpdatePage />
            </BrowserRouter>);
            const articleName = await waitFor(() => getByText("update"));
            const createButton = await waitFor(() => getByText("woskalin"));
            expect(articleName).toBeInTheDocument;
            expect(createButton).toBeInTheDocument;
        });
    });
});
