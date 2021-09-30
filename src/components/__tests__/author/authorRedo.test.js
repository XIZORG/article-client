import { render, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AuthorRedo from "../../author/AuthorRedo";

it("decrements count delayed", async () => {
    const data = {
            "name": "woskalin",
            "id": 9,
            "articles": [
              {
                "id": 14,
                "name": "lolo",
                "description": "lolo"
              }
            ]
          };
    const { getByText } = render(<BrowserRouter>
        <AuthorRedo authorState={data} />
    </BrowserRouter>);
    const countSpan = await waitFor(() => getByText("delete"));

    expect(countSpan).toBeInTheDocument;
});
