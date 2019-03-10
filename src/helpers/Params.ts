/**
 * @param authorizationHeader Authorization header string
 * @returns [username, password] parsed authorization data
 * @throws Error when format of header data is wrong
 */
export const parseBasicAuthorization = (authorizationHeader: string): [string, string] => {
    // Split Authorization header and check if it's ok
    const pieces = (authorizationHeader as string).split(" ", 2);

    if (pieces.length !== 2 || pieces[0].toLowerCase() !== "basic") {
        throw new Error("Wrong format of basic authentication data");
    }
    const buffer = Buffer.from(pieces[1], "base64");
    const [one, two] = buffer.toString().split(":");
    return [one, two];
};
