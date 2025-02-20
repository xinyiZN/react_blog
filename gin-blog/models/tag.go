package models

import (
	"fmt"
	"strconv"
	"time"

	"github.com/jinzhu/gorm"
)

type Tag struct {
	Model
	Name         string `json:"name"`
	CreatedBy    string `json:"created_by"`
	ModifiedBy   string `json:"modified_by"`
	State        int    `json:"state"`
	Color        string `json:"color"`
	ArticleCount int    `json:"article_count"`
}

// 当向 Find方法传入一个结构体切片指针
// 例如 &tags，其中 tags 是 []Tag 类型）时，GORM会依据传入的结构体类型自动推断出要操作的数据库表
func GetTags(pageNum int, pageSize int, maps interface{}) (tags []Tag) {
	db.Where(maps).Offset(pageNum).Limit(pageSize).Find(&tags)
	return
}

func GetTagTotal(maps interface{}) (count int) {
	//使用db.Model(&Tag{})可以指定具体操作的数据表
	db.Model(&Tag{}).Where(maps).Count(&count)
	return
}

func ExistTagByName(name string) bool {
	var tag Tag
	db.Select("id").Where("name = ?", name).First(&tag)
	return tag.ID > 0
}

func AddTag(name string, state int, createdBy string) bool {
	db.Create(&Tag{
		Name:      name,
		State:     state,
		CreatedBy: createdBy,
	})
	return true
}

// BeforeCreate 方法会在创建数据库记录之前被调用，用于自动设置 CreateOn 字段的值为当前时间的 Unix 时间戳；
// BeforeUpdate 方法会在更新数据库记录之前被调用，用于自动设置 ModifiedOn 字段的值为当前时间的 Unix 时间戳
func (tag *Tag) BeforeCreate(scope *gorm.Scope) error {
	scope.SetColumn("CreatedOn", time.Now().Unix())
	return nil
}

func (tag *Tag) BeforeUpdate(scope *gorm.Scope) error {
	scope.SetColumn("ModifiedOn", time.Now().Unix())
	return nil
}

func ExistTagByID(id int) bool {
	var tag Tag
	db.Select("id").Where("id = ?", id).First(&tag)
	return tag.ID > 0
}

func EditTag(id int, data interface{}) bool {
	db.Model(&Tag{}).Where("id = ?", id).Updates(data)

	return true
}
func DeleteTag(id int) bool {
	db.Where("id = ?", id).Delete(&Tag{})

	return true
}

func GetArticleByTag(id int) (article []Article) {

	// 将整数 id 转换为字符串
	idStr := strconv.Itoa(id)
	tagIDStr := "," + idStr + ","
	startWithID := idStr + ",%"
	endWithID := "%," + idStr
	fmt.Println("tagIDStr:", tagIDStr)
	// 处理 TagIDs 以单个标签 ID 开头或结尾的情况
	db.Where("tag_ids LIKE? OR tag_ids LIKE? OR tag_ids LIKE?", tagIDStr, startWithID, endWithID).Find(&article)
	fmt.Printf("获取到的文章数量: %d\n", len(article))
	return
}
