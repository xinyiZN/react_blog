package models

import (
	"github.com/jinzhu/gorm"

	"strconv"
	"strings"
	"time"
)

type Article struct {
	Model
	//若使用了数据表的自动迁移功能会影响--gorm:index
	TagIDs     string   `json:"tag_ids" gorm:"column:tag_ids"` // 存储格式："1,2,3"
	Tags       []Tag    `json:"tags" gorm:"-"`                 // 临时字段，不存入数据库
	CategoryID int      `json:"category_id" gorm:"index"`
	Category   Category `json:"category"`
	Title      string   `json:"title"`
	Desc       string   `json:"desc"`
	Content    string   `json:"content"`
	CreatedBy  string   `json:"created_by"`
	ModifiedBy string   `json:"modified_by"`
	State      int      `json:"state"`
	Url        string   `json:"url"`
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
	db.Preload("Category").Where(maps).Offset(pageNum).Limit(pageSize).Find(&articles)

	// 手动查询每篇文章的标签
	for i := range articles {
		if articles[i].TagIDs != "" {
			var tagIDs []int
			for _, idStr := range strings.Split(articles[i].TagIDs, ",") {
				if id, err := strconv.Atoi(idStr); err == nil {
					tagIDs = append(tagIDs, id)
				}
			}
			if len(tagIDs) > 0 {
				var tags []Tag
				db.Where("id IN (?)", tagIDs).Find(&tags)
				articles[i].Tags = tags
			}
		}
	}
	return
}

// 模糊查询文章
func SearchArticle(value string) (article []Article) {
	// 使用 GORM 的 Where 方法进行模糊查询
	db.Where("`desc` LIKE ?", "%"+value+"%").Find(&article)
	return
}

// 根据文章的id查询对应的文章信息，并且关联查询该文章所属的标签信息
func GetArticle(id int) (article Article) {
	db.Where("id=?", id).First(&article)
	db.Model(&article).Related(&article.Category)

	// 查询文章的标签
	if article.TagIDs != "" {
		var tagIDs []int
		for _, idStr := range strings.Split(article.TagIDs, ",") {
			if id, err := strconv.Atoi(idStr); err == nil {
				tagIDs = append(tagIDs, id)
			}
		}
		if len(tagIDs) > 0 {
			var tags []Tag
			db.Where("id IN (?)", tagIDs).Find(&tags)
			article.Tags = tags
		}
	}
	return
}

// 根据文章id更新文章
func EditArticle(id int, data interface{}) bool {
	db.Model(&Article{}).Where("id=?", id).Update(data)
	return true
}

// 添加文章
func AddArticle(data map[string]interface{}) bool {
	var tagIDStrs []string
	// 处理标签ID
	if tagIDs, ok := data["tag_ids"].([]int); ok {
		for _, id := range tagIDs {
			tagIDStrs = append(tagIDStrs, strconv.Itoa(id))
		}
	}

	title := data["title"].(string)

	article := Article{
		Title:      title,
		Desc:       data["desc"].(string),
		Content:    data["content"].(string),
		CreatedBy:  data["created_by"].(string),
		State:      data["state"].(int),
		CategoryID: data["category_id"].(int),
		TagIDs:     strings.Join(tagIDStrs, ","),
		Url:        data["markdown"].(string),
	}

	db.Create(&article)

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
