import { Avatar, Box, Typography } from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useRecoilValue } from "recoil";
import { currentUserAtom } from "../../store/atoms/atom";

function extractCodeFromString(message: string) {
  if (message.includes("```")) {
    const blocks = message.split("```");
    return blocks;
  }
}

function isCodeBlock(str: string) {
  if (
    str.includes("=") ||
    str.includes(";") ||
    str.includes("[") ||
    str.includes("]") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("#") ||
    str.includes("//")
  ) {
    return true;
  }
  return false;
}
const ChatItem = ({
  message,
  response,
}: {
  message: string;
  response: string;
}) => {
  const messageBlocks = extractCodeFromString(response);

  const getCurrentUser = useRecoilValue(currentUserAtom);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          p: 2,
          bgcolor: "#004d56",
          gap: 2,
          borderRadius: 2,
        }}
      >
        <Avatar sx={{ ml: "0", bgcolor: "black", color: "white" }}>
          {getCurrentUser.name ? getCurrentUser.name[0] : ""}
        </Avatar>
        <Box>
          {!messageBlocks && (
            <Typography sx={{ fontSize: "20px" }}>{message}</Typography>
          )}
          {messageBlocks &&
            messageBlocks.length &&
            messageBlocks.map((block) =>
              isCodeBlock(block) ? (
                <SyntaxHighlighter style={coldarkDark} language="javascript">
                  {block}
                </SyntaxHighlighter>
              ) : (
                <Typography sx={{ fontSize: "20px" }}>{block}</Typography>
              )
            )}
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          p: 2,
          bgcolor: "#004d5612",
          gap: 2,
          borderRadius: 2,
          my: 1,
        }}
      >
        <Avatar sx={{ ml: "0" }}>
          <img src="openai.png" alt="openai" width={"30px"} />
        </Avatar>
        <Box>
          {!messageBlocks && (
            <Typography sx={{ fontSize: "20px" }}>{response}</Typography>
          )}
          {messageBlocks &&
            messageBlocks.length &&
            messageBlocks.map((block) =>
              isCodeBlock(block) ? (
                <SyntaxHighlighter style={coldarkDark} language="javascript">
                  {block}
                </SyntaxHighlighter>
              ) : (
                <Typography sx={{ fontSize: "20px" }}>{block}</Typography>
              )
            )}
        </Box>
      </Box>
    </>
  );
};

export default ChatItem;