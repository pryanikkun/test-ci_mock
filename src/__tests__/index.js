import {getLevel} from "../index"
import fetchData from "../http"

jest.mock("../http")

beforeEach(
    () => {
        jest.resetAllMocks();
    }
);

test.each([
    [1, 'Ваш текущий уровень: user', { status: 'ok', level: "user" }],
    [2, 'Информация об уровне временно недоступна', { status: "error" }]
])(
    ("should check  1 level"),
    (userId, expected, returnValue) => {
        fetchData.mockReturnValue(returnValue)
        let result = getLevel(userId)
        expect(fetchData).toBeCalledWith(`https://server/user/${userId}`)
        expect(result).toBe(expected)
   }
)