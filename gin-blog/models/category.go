package models

import (
	"time"

	"github.com/jinzhu/gorm"
)

type Category struct {
	Model
	Name       string `json:"name"`
	CreatedBy  string `json:"created_by"`
	ModifiedBy string `json:"modified_by"`
	State      int    `json:"state"`
}

func GetCategory(pageNum int, pageSize int, maps interface{}) (categories []Category) {
	db.Where(maps).Offset(pageNum).Limit(pageSize).Find(&categories)
	return
}

func GetCategoryTotal(maps interface{}) (count int) {
	//使用db.Model(&Category{})可以指定具体操作的数据表
	db.Model(&Category{}).Where(maps).Count(&count)
	return
}

func ExistCategoryByName(name string) bool {
	var Category Category
	db.Select("id").Where("name = ?", name).First(&Category)
	return Category.ID > 0
}

func AddCategory(name string, state int, createdBy string) bool {
	db.Create(&Category{
		Name:      name,
		State:     state,
		CreatedBy: createdBy,
	})
	return true
}

// BeforeCreate 方法会在创建数据库记录之前被调用，用于自动设置 CreateOn 字段的值为当前时间的 Unix 时间戳；
// BeforeUpdate 方法会在更新数据库记录之前被调用，用于自动设置 ModifiedOn 字段的值为当前时间的 Unix 时间戳
func (Category *Category) BeforeCreate(scope *gorm.Scope) error {
	scope.SetColumn("CreatedOn", time.Now().Unix())
	return nil
}

func (Category *Category) BeforeUpdate(scope *gorm.Scope) error {
	scope.SetColumn("ModifiedOn", time.Now().Unix())
	return nil
}

func ExistCategoryByID(id int) bool {
	var Category Category
	db.Select("id").Where("id = ?", id).First(&Category)
	return Category.ID > 0
}

func EditCategory(id int, data interface{}) bool {
	db.Model(&Category{}).Where("id = ?", id).Updates(data)

	return true
}
func DeleteCategory(id int) bool {
	db.Where("id = ?", id).Delete(&Category{})

	return true
}
