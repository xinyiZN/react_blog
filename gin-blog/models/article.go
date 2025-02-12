package models

import (
	"github.com/jinzhu/gorm"

	"time"
)

type Article struct {
	Model
	//若使用了数据表的自动迁移功能会影响--gorm:index
	TagID int `json:"tag_id" gorm:"index"`
	Tag   Tag `json:"tag"`

	Title      string `json:"title"`
	Desc       string `json:"desc"`
	Content    string `json:"content"`
	CreatedBy  string `json:"created_by"`
	ModifiedBy string `json:"modified_by"`
	State      int    `json:"state"`
}

// 根据文章ID判断文章是否存在
func ExistArticleByID(id int) bool {
	var article Article
	db.Select("id").Where("id=?", id).First(&article)
	return article.ID > 0
}

// 获取所有文章数量
func GetArticleTotal(maps interface{}) (count int) {
	//使用了空接口类型 interface{} 作为参数类型。
	//空接口可以接收任意类型的值，意味着该函数可以传入不同类型的条件参数，这些参数将用于筛选文章记录
	db.Model(&Article{}).Where(maps).Count(&count)
	return
}

// 获取所有文章
func GetArticles(pageNum int, pageSize int, maps interface{}) (articles []Article) {
	//Preload是预加载器
	//会执行两条SQL，分别是SELECT * FROM blog_articles;和SELECT * FROM blog_tag WHERE id IN (1,2,3,4)
	//内部处理对应的映射逻辑，将其填充到Article的Tag中
	db.Preload("Tag").Where(maps).Offset(pageNum).Limit(pageSize).Find(&articles)
	return
}

// 根据文章的id查询对应的文章信息，并且关联查询该文章所属的标签信息
func GetArticle(id int) (article Article) {
	db.Where("id=?", id).First(&article)
	//关联查询，通过在Article结构体里嵌套Tag结构体实现
	db.Model(&article).Related(&article.Tag)
	return
}

// 根据文章id更新文章
func EditArticle(id int, data interface{}) bool {
	db.Model(&Article{}).Where("id=?", id).Update(data)
	return true
}

// 添加文章
func AddArticle(data map[string]interface{}) bool {
	db.Create(&Article{
		TagID:     data["tag_id"].(int),
		Title:     data["title"].(string),
		Desc:      data["desc"].(string),
		Content:   data["content"].(string),
		CreatedBy: data["created_by"].(string),
		State:     data["state"].(int),
	})
	return true
}

func DeleteArticle(id int) bool {
	db.Where("id = ?", id).Delete(Article{})

	return true
}

func (article *Article) BeforeCreate(scope *gorm.Scope) error {
	scope.SetColumn("CreatedOn", time.Now().Unix())

	return nil
}

func (article *Article) BeforeUpdate(scope *gorm.Scope) error {
	scope.SetColumn("ModifiedOn", time.Now().Unix())
	return nil
}
