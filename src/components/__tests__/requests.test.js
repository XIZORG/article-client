import mockAxios from "jest-mock-axios";
import { getAllArticles } from "../../dal/server/articles-api";

describe("getAllArticles", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  describe("when API call is successful", () => {
    it("should return users list", async () => {
      // given
      const articles = [
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
      ];
      mockAxios.get.mockResolvedValueOnce(articles);

      // when
      const result = await getAllArticles();

      // then
    //   expect(mockAxios.get).toHaveBeenCalledWith(`${BASE_URL}/users`);
      expect(result).toEqual(articles);
    });
  });
});


