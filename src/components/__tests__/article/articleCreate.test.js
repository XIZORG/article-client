import { render, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ArticleCreatePage from "../../article/ArticleCreatePage";
import mockAxios from "../../__mocks__/axios";

it("decrements count delayed", async () => {

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
        <ArticleCreatePage />
    </BrowserRouter>);
    const countSpan = await waitFor(() => getByText("create"));
    const author = await waitFor(() => getByText("Mike"));
    expect(countSpan).toBeInTheDocument;
    expect(author).toBeInTheDocument;
});
