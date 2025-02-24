package routers

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/xxinzn/gin-blog/pkg/logging"
	"github.com/xxinzn/gin-blog/pkg/setting"
	"github.com/xxinzn/gin-blog/routers/api"
	v1 "github.com/xxinzn/gin-blog/routers/api/v1"
)

func InitRouter() *gin.Engine {
	r := gin.New()
	// 从配置文件中读取静态资源路径
	imgDir := setting.IMGPath
	mdFilesDir := setting.MDPath
	log.Printf("静态资源路径：%s", imgDir)
	logging.Info("文件路径 %s", mdFilesDir)
	// 添加静态资源路由
	r.Static("/assets/img", imgDir)
	r.Static("/assets/md", mdFilesDir)

	// // 可以添加一些中间件来控制访问
	// r.Use(static.Serve("/assets", static.LocalFile(assetsDir, false)))

	r.Use(gin.Logger())

	r.Use(gin.Recovery())

	gin.SetMode(setting.RunMode)
	// r.GET("/auth", api.GetAuth)
	apiv1 := r.Group("/api/v1")
	// apiv1.Use(jwt.JWT())
	{
		//用户接口
		apiv1.GET("/auth", api.GetAuthForBlog)
		//标签接口
		apiv1.GET("/tags", v1.GetTags)
		apiv1.GET("/tags/:id", v1.GetArticleByTag)
		apiv1.POST("/tags", v1.AddTag)
		apiv1.PUT("/tags/:id", v1.EditTag)
		apiv1.DELETE("/tags/:id", v1.DeleteTag)

		//获取文章列表
		apiv1.GET("/articles", v1.GetArticles)
		//获取指定文章
		apiv1.GET("/articles/:id", v1.GetArticle)
		//模糊查询文章
		apiv1.GET("/articles/search", v1.SearchArticle)
		//新建文章
		apiv1.POST("/articles", v1.AddArticle)
		//更新指定文章
		apiv1.PUT("/articles/:id", v1.EditArticle)
		//删除指定文章
		apiv1.DELETE("/articles/:id", v1.DeleteArticle)
	}

	return r
}
