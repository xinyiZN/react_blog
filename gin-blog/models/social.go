package models

type Social struct {
	ID       uint   `gorm:"primary_key" json:"id"`
	Platform string `gorm:"type:varchar(50);not null" json:"platform"`
	URL      string `gorm:"type:varchar(255);not null" json:"url"`
}
