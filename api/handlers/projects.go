package handlers

import (
	"encoding/json"
	"net/http"
	"portfolio-api/models"
	"portfolio-api/utils"
)

func GetProjects(w http.ResponseWriter, r *http.Request) {
	utils.EnableCORS(w) // fix cors issues
	// w.Header().Set("Access-Control-Allow-Origin", "*")
	// w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	var projects []models.Project
	err := utils.LoadJSON("./storage/projects.json", &projects)
	if err != nil {
		http.Error(w, "Failed to load projects", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(projects)
}
