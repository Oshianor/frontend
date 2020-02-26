const api = "http://localhost:5000/api";
// const api = "http://cn.tipestry.com/api";

export const config = {
	login: api + "/auth",
	me: api + "/user",
	topics: api + "/topic",
	uploadImgPost: api + "/topic/img",
	uploadTextPost: api + "/topic/text",
	topicVote: api + "/topic/vote",
	topicTip: api + "/topic/tips",
	comment: api + "/topic/comment",
	reply: api + "/topic/reply",
	validateUrl: api + "/topic/check-url",
	tipPost: api + "/transaction/tip/topic",
	favourite: api + "/user/favourite",
	topTags: "https://tipestry.com/api/topic/top/hashtag"
}