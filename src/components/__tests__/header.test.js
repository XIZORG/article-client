import { render, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "../header/Header";

it("decrements count delayed", async () => {
    const { getByText } = render(<BrowserRouter><Header />
    </BrowserRouter>);
    const main = await waitFor(() => getByText("Main"));
    const article = await waitFor(() => getByText("Articles"));
    const author = await waitFor(() => getByText("Authors"));
    expect(main).toBeInTheDocument;
    expect(article).toBeInTheDocument;
    expect(author).toBeInTheDocument;

});
