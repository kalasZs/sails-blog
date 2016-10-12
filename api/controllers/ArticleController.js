/**
 * Created by WittBulter on 2016/10/12.
 * @description :: 文章相关逻辑
 */

module.exports = {

	/**
	 *
	 * @api {GET} http://wittsay.cc/api/article/:id [show]
	 * @apiGroup Article
	 * @apiDescription 获取指定文章详细信息 任何权限
	 * @apiParam (path) {string} id 文章id
	 * @apiUse CODE_200
	 * @apiUse CODE_500
	 * @apiSuccessExample {json} Response 400 Example
	 *   HTTP/1.1 400 Interface Error
	 *   {
	 *     "code": 400,
	 *     "message": "xxx"
	 *   }
	 */
	show: (req, res) =>{
		const id = req.params&& req.params.length? req.params[0]: ''
		if (!id) return res.badRequest({message: '至少需要指定文章id'})

		ArticleService.findArticle(id, (err, articles) =>{
			if (err) return res.serverError()

			res.ok(articles[0])
		})
	},

	/**
	 *
	 * @api {POST} http://wittsay.cc/api/article/:id [update]
	 * @apiGroup Article
	 * @apiDescription 修改指定文章 需要管理员权限或更高
	 * @apiParam (path) {string} id 文章id
	 * @apiParam (body) {string} [title] 文章标题
	 * @apiParam (body) {string} [content] 文章内容
	 * @apiUse CODE_200
	 * @apiUse CODE_500
	 */
	update: (req, res) =>{
		const id = req.params&& req.params.length? req.params[0]: ''
		const {title, content} = req.allParams()
		if (!id) return res.badRequest({message: '至少需要指定文章id'})
		if (!title && !content) return res.badRequest({message: '缺少body参数'})
		if (title.length < 5|| content.length < 5) return res.badRequest({message: '文章内容过少'})

		ArticleService.updateArticle(id, {title: title, content: content}, (err, updated) =>{
			if (err) return res.serverError()

			res.ok(updated)
		})

	}

}