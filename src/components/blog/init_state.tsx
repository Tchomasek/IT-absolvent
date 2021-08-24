const text1 = `
# Title
- item 1
- item 2
##### Subtitle
**bold** *italic*
`;
const text2 = `
During the Cultural Revolution, Ye Wenjie, an astrophysics graduate from Tsinghua University, witnesses her father beaten to death during a struggle session by Red Guards from Tsinghua High School supported by Ye's mother and younger sister. Ye is officially branded a traitor and is forced to join a labor brigade in Inner Mongolia, where she befriends a government journalist who enlists Ye's help in transcribing a letter to the government detailing policy suggestions based on the book Silent Spring, which she read. But the journalist betrays Ye, who is sentenced to prison after the letter is viewed as seditious by the government. In prison, Yang Weining and Lei Zhicheng, two military physicists working under Red Coast, a secret Chinese initiative to use high powered radio waves to damage spy satellites, recruit Ye because of her skills in physics. After working there for some time, she learns that the stated purpose is a front for Red Coast's true purpose: the search for extraterrestrial life. Ye discovers the possibility of amplifying outgoing radio waves by using microwave cavities within the sun and sends an interstellar message. Eight years later, by now in a loveless marriage with Yang, Ye receives a message from a concerned alien pacifist from the planet Trisolaris, warning her not to respond or else the inhabitants of Trisolaris will find and invade Earth. The alien describes Trisolaris's environmental conditions and societal history. Disillusioned by the political chaos and having come to despise humankind, Ye responds anyway, inviting them to come to Earth to settle its problems. She murders Yang and Lei to keep the alien message secret.`;

export const init_state = [
  { id: 0, header: "Markdown", text: text1 },
  { id: 1, header: "Plain text", text: text2 },
];
