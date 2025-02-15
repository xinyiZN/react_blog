package models

import (
	"strings"
)

type Auth struct {
	ID        int      `gorm:"primary_key" json:"id"`
	SocailIDs string   `json:"social_ids" gorm:"column:social_ids"` // 存储格式："1,2,3"
	Socails   []Social `json:"socials" gorm:"-"`                    // 临时字段，不存入数据库
	Name      string   `json:"name"`
	Username  string   `json:"username"`
	Password  string   `json:"password"`
	Des       string   `json:"des"`
	Avatar    string   `json:"avatar"`
}

func CheckAuth(username, password string) bool {
	var auth Auth
	db.Select("id").Where(Auth{Username: username, Password: password}).First(&auth)
	return auth.ID > 0
}

func GetAuth(maps interface{}) (Auth, error) {
	var auth Auth
	err := db.Where(maps).First(&auth).Error
	if err != nil {
		return auth, err
	}

	// 解析SocailIDs字符串为切片
	if auth.SocailIDs != "" {
		socialIDs := strings.Split(auth.SocailIDs, ",")
		var socials []Social
		// 查询对应的Social记录
		err = db.Where("id IN (?)", socialIDs).Find(&socials).Error
		if err != nil {
			return auth, err
		}
		auth.Socails = socials
	}

	return auth, nil
}
