import { render, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ArticleContext } from "../../../App";
import AddAuthorsToArticlesPage from "../../article/articlePage/AddAuthorsToArticlesPage";
import mockAxios from "../../__mocks__/axios";


it("decrements count delayed", async () => {

    let articleArray = [10];

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
          }};
    mockAxios.get.mockResolvedValueOnce(resp2);

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
    ]};

    mockAxios.get.mockResolvedValueOnce(resp);

    const { getByText } = render(<BrowserRouter>
        <ArticleContext.Provider value={articleArray}>
            <AddAuthorsToArticlesPage />
        </ArticleContext.Provider >

    </BrowserRouter>);
    const countSpan = await waitFor(() => getByText("Maxim Velik"));
    expect(countSpan).toBeInTheDocument;
});
