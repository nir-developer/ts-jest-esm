import { DataBase } from "../../../app/server_app/data/DataBase";

///NOTE: Import everything with alias -to have the object to pass to spyOn!!
import * as IdGenerator from "../../../app/server_app/data/IdGenerator";

type someTypeWithId = {
  id: string;
  name: string;
  color: string;
};
describe("DataBase test suite", () => {
  let sut: DataBase<someTypeWithId>;

  //Control the random id
  const fakedId = "1234";

  //EMPTY ID AT THE MOMENT - SINCE IT IS GIVEN BY THE DB
  const someObject1 = { id: "", name: "someName", color: "blue" };
  //SAME COLOR AS someObject1 - to test getAllBy !
  const someObject2 = { id: "", name: "someOtherName", color: "blue" };

  //SETUP
  beforeEach(() => {
    sut = new DataBase<someTypeWithId>();

    //Spy on the generateRandomId method of the IdGenerator - Configure it's return value
    jest.spyOn(IdGenerator, "generateRandomId").mockReturnValue(fakedId);

    //Check if this works! with mockImplemenation
    //.mockImplementation(() => fakedId);
  });

  //TEST THE MAIN GOAL OF THE INSERT METHOD ! return an id after success
  //MUST ASYNC - SINCE THE insert returns a PROMISE
  it("should return id after insert", async () => {
    //IT WORKS - BUT I WANT TO INSERT A TYPE OF someWithId!!!!
    //const actual = await sut.insert({} as someTypeWithId);

    //INSERT A TYPE OF someTypeWithId
    const actual = await sut.insert({ id: "" } as someTypeWithId);
    //ASSERT
    expect(actual).toBe(fakedId);
  });

  it("should get element after insert", async () => {
    //ARRANGE
    await sut.insert(someObject1);
    await sut.insert(someObject2);

    const expected = [someObject1, someObject2];

    //ACT
    const actual = await sut.findAllBy("color", "blue");

    //ASSERT
    expect(actual).toEqual(expected);

    console.log(actual);
  });

  it("should change the color on object", async () => {
    //ARRANGE
    const id = await sut.insert(someObject1);

    const expectedColor = "red";

    //ACT -NOT!!
    //const actual = await sut.update(id, "color", expectedColor);
    await sut.update(id, "color", expectedColor);

    //NOT!! I NEED TO QUERY FOR THE SAME OBJECT I CREATED!
    // const object = await sut.getBy('color', expectedColor)
    const object = await sut.getBy("id", id);
    const actualColor = object.color;
    //ASSERT
    expect(actualColor).toBe(expectedColor);
  });
});
