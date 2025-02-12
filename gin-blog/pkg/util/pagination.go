package util

import (
	"github.com/gin-gonic/gin"
	"github.com/unknwon/com"
	"github.com/xxinzn/gin-blog/pkg/setting"
)

func GetPage(c *gin.Context) int {
	result := 0
	// 从 gin.Context 对象中获取名为 "page" 的查询参数
	// com.StrTo 可能是一个自定义的将字符串转换为其他类型的工具函数
	// .Int() 尝试将获取到的字符串转换为整数
	page, _ := com.StrTo(c.Query("page")).Int()
	if page > 0 {
		//计算偏移量的常见公式
		result = (page - 1) * setting.PageSize
	}

	return result
}
