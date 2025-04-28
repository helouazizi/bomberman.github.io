package utils

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
)

func LoadJSON[T any](filePath string, target *[]T) error {
	// lets read the json file data into a slice of bytes
	content, err := os.ReadFile(filePath)
	if err != nil {
		return fmt.Errorf("failed to read data from : %s", filePath)
	}

	// lets unmarshel the content into our target
	if err := json.Unmarshal(content, &target); err != nil {
		return fmt.Errorf("failed to Unmarshal data from : %s,%w", filePath, err)
	}
	return nil
}

func SaveJSON[T any](filePath string, data []T) error {
	bytes, err := json.MarshalIndent(data, "", "  ")
	if err != nil {
		return fmt.Errorf("failed to marshal JSON: %w", err)
	}

	err = os.WriteFile(filePath, bytes, 0644)
	if err != nil {
		return fmt.Errorf("failed to write file %s: %w", filePath, err)
	}
	return nil
}

func EnableCORS(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
}
