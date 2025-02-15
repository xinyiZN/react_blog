package util

import (
	"fmt"
	"io"
	"mime/multipart"
	"os"
	"path/filepath"
	"time"
)

// 保存Markdown 文件
func SaveArticleMarkdown(title string, markdownFile *multipart.File) (string, error) {
	// 确保目录存在
	if err := os.MkdirAll("assets/md", 0755); err != nil {
		return "", fmt.Errorf("创建目录失败: %v", err)
	}

	// 生成文件名（使用时间戳和标题组合）
	timestamp := time.Now().Format("20060102150405")
	fileName := fmt.Sprintf("%s-%s.md", timestamp, title)
	filePath := filepath.Join("assets/md", fileName)

	// 创建目标文件
	dst, err := os.Create(filePath)
	if err != nil {
		return "", fmt.Errorf("创建文件失败: %v", err)
	}
	defer dst.Close()

	// 复制文件内容
	if _, err := io.Copy(dst, *markdownFile); err != nil {
		return "", fmt.Errorf("保存文件失败: %v", err)
	}

	return filePath, nil
}
