// const api = "http://localhost:5000/api";
const api = "http://cn.tipestry.com/api";

export const config = {
	login: api + "/auth",
	me: api + "/user",
	topics: api + "/topic",
	topicVote: api + "/topic/vote",
	topicTip: api + "/topic/tips",
	tipPost: api + "/transaction/tip/topic",
	favourite: api + "/user/favourite",
	topTags: "https://tipestry.com/api/topic/top/hashtag"
}