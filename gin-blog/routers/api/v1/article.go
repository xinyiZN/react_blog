package v1

import (
	"net/http"
	"strings"

	"github.com/astaxie/beego/validation"
	"github.com/gin-gonic/gin"
	"github.com/unknwon/com"
	"github.com/xxinzn/gin-blog/models"
	"github.com/xxinzn/gin-blog/pkg/e"
	"github.com/xxinzn/gin-blog/pkg/logging"
	"github.com/xxinzn/gin-blog/pkg/setting"
	"github.com/xxinzn/gin-blog/pkg/util"
)

// 获取单个文章
func GetArticle(c *gin.Context) {
	id := com.StrTo(c.Param("id")).MustInt()
	valid := validation.Validation{}
	valid.Min(id, 1, "id").Message("ID必须大于0")

	code := e.INVALID_PARAMS
	var data interface{}
	if !valid.HasErrors() {
		//根据id判断文章是否存在
		if models.ExistArticleByID(id) {
			//获取当前文章的数据
			data = models.GetArticle(id)
			code = e.SUCCESS
		} else {
			code = e.ERROR_NOT_EXIST_ARTICLE
		}
	} else {
		for _, err := range valid.Errors {
			logging.Info("err.key: %s, err.message: %s", err.Key, err.Message)
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"code": code,
		"msg":  e.GetMsg(code),
		"data": data,
	})
}

// 获取多个文章
func GetArticles(c *gin.Context) {
	data := make(map[string]interface{})
	maps := make(map[string]interface{})
	valid := validation.Validation{}
	var state int = -1
	if arg := c.Query("state"); arg != "" {
		state = com.StrTo(arg).MustInt()
		maps["state"] = state
		valid.Range(state, 0, 1, "state").Message("状态只允许0或1")
	}

	var tagId int = -1
	if arg := c.Query("tag_id"); arg != "" {
		tagId = com.StrTo(arg).MustInt()
		maps["tag_id"] = tagId
		valid.Min(tagId, 1, "tag_id").Message("标签ID必须大于0")
	}

	var categoryId int = -1
	if arg := c.Query("category_id"); arg != "" {
		categoryId = com.StrTo(arg).MustInt()
		maps["category_id"] = categoryId
		valid.Min(categoryId, 1, "category_id").Message("分类ID必须大于0")
	}

	code := e.INVALID_PARAMS
	if !valid.HasErrors() {
		code = e.SUCCESS

		data["lists"] = models.GetArticles(util.GetPage(c), setting.PageSize, maps)
		data["total"] = models.GetArticleTotal(maps)

	} else {
		for _, err := range valid.Errors {
			logging.Info("err.key: %s, err.message: %s", err.Key, err.Message)
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"code": code,
		"msg":  e.GetMsg(code),
		"data": data,
	})
}

// 新增文章
func AddArticle(c *gin.Context) {
	// 获取标签ID数组
	tagIDsStr := c.PostForm("tag_ids") // 格式："1,2,3"
	title := c.PostForm("title")
	desc := c.PostForm("desc")
	content := c.PostForm("content")
	createdBy := c.PostForm("created_by")
	state := com.StrTo(c.DefaultPostForm("state", "0")).MustInt()
	categoryId := com.StrTo(c.PostForm("category_id")).MustInt()

	// 添加日志输出
	logging.Info("接收到的参数：")
	logging.Info("tag_ids: %v", tagIDsStr)
	logging.Info("title: %v", title)
	logging.Info("desc: %v", desc)
	logging.Info("content: %v", content)
	logging.Info("created_by: %v", createdBy)
	logging.Info("state: %v", state)
	logging.Info("category_id: %v", categoryId)

	// 将标签ID字符串转换为整数数组
	var tagIDs []int
	if tagIDsStr != "" {
		for _, idStr := range strings.Split(tagIDsStr, ",") {
			if id := com.StrTo(idStr).MustInt(); id > 0 {
				tagIDs = append(tagIDs, id)
			}
		}
	}

	valid := validation.Validation{}
	valid.Required(tagIDs, "tag_ids").Message("标签ID不能为空")
	valid.Required(title, "title").Message("标题不能为空")
	valid.Required(desc, "desc").Message("简述不能为空")
	valid.Required(content, "content").Message("内容不能为空")
	valid.Required(createdBy, "created_by").Message("创建人不能为空")
	valid.Range(state, 0, 1, "state").Message("状态只允许0或1")
	valid.Min(categoryId, 1, "category_id").Message("类别ID必须大于0")

	code := e.INVALID_PARAMS
	if !valid.HasErrors() {
		// 验证所有标签是否存在
		tagsExist := true
		for _, tagID := range tagIDs {
			if !models.ExistTagByID(tagID) {
				logging.Info("标签不存在：", tagID)
				tagsExist = false
				break
			}
		}

		if tagsExist {
			data := make(map[string]interface{})
			data["tag_ids"] = tagIDs
			data["title"] = title
			data["desc"] = desc
			data["content"] = content
			data["created_by"] = createdBy
			data["state"] = state
			data["category_id"] = categoryId

			models.AddArticle(data)
			code = e.SUCCESS
		} else {
			code = e.ERROR_NOT_EXIST_TAG
		}
	} else {
		for _, err := range valid.Errors {
			logging.Info("err.key: %s, err.message: %s", err.Key, err.Message)
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"code": code,
		"msg":  e.GetMsg(code),
		"data": make(map[string]interface{}),
	})
}

// 修改文章
func EditArticle(c *gin.Context) {
	valid := validation.Validation{}
	id := com.StrTo(c.PostForm("id")).MustInt()
	tagIDsStr := c.PostForm("tag_ids")
	title := c.PostForm("title")
	desc := c.PostForm("desc")
	content := c.PostForm("content")
	modifiedBy := c.PostForm("modified_by")

	// 将标签ID字符串转换为整数数组
	var tagIDs []int
	if tagIDsStr != "" {
		for _, idStr := range strings.Split(tagIDsStr, ",") {
			if id := com.StrTo(idStr).MustInt(); id > 0 {
				tagIDs = append(tagIDs, id)
			}
		}
	}

	var state int = -1
	if arg := c.PostForm("state"); arg != "" {
		state = com.StrTo(arg).MustInt()
		valid.Range(state, 0, 1, "state").Message("状态只允许0或1")
	}

	valid.Min(id, 1, "id").Message("ID必须大于0")
	valid.MaxSize(title, 100, "title").Message("标题最长为100字符")
	valid.MaxSize(desc, 255, "desc").Message("简述最长为255字符")
	valid.MaxSize(content, 65535, "content").Message("内容最长为65535字符")
	valid.Required(modifiedBy, "modified_by").Message("修改人不能为空")
	valid.MaxSize(modifiedBy, 100, "modified_by").Message("修改人最长为100字符")

	code := e.INVALID_PARAMS
	if !valid.HasErrors() {
		if models.ExistArticleByID(id) {
			// 验证所有标签是否存在
			tagsExist := true
			if len(tagIDs) > 0 {
				for _, tagID := range tagIDs {
					if !models.ExistTagByID(tagID) {
						tagsExist = false
						break
					}
				}
			}

			if tagsExist {
				data := make(map[string]interface{})
				if len(tagIDs) > 0 {
					data["tag_ids"] = tagIDs
				}
				if title != "" {
					data["title"] = title
				}
				if desc != "" {
					data["desc"] = desc
				}
				if content != "" {
					data["content"] = content
				}
				data["modified_by"] = modifiedBy

				models.EditArticle(id, data)
				code = e.SUCCESS
			} else {
				code = e.ERROR_NOT_EXIST_TAG
			}
		} else {
			code = e.ERROR_NOT_EXIST_ARTICLE
		}
	} else {
		for _, err := range valid.Errors {
			logging.Info("err.key: %s, err.message: %s", err.Key, err.Message)
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"code": code,
		"msg":  e.GetMsg(code),
		"data": make(map[string]string),
	})
}

// 删除文章
func DeleteArticle(c *gin.Context) {
	id := com.StrTo(c.Param("id")).MustInt()

	valid := validation.Validation{}
	valid.Min(id, 1, "id").Message("ID必须大于0")

	code := e.INVALID_PARAMS
	if !valid.HasErrors() {
		if models.ExistArticleByID(id) {
			models.DeleteArticle(id)
			code = e.SUCCESS
		} else {
			code = e.ERROR_NOT_EXIST_ARTICLE
		}
	} else {
		for _, err := range valid.Errors {
			logging.Info("err.key: %s, err.message: %s", err.Key, err.Message)
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"code": code,
		"msg":  e.GetMsg(code),
		"data": make(map[string]string),
	})
}
