package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"portfolio-api/models"
	"portfolio-api/utils"
)

func GetScores(w http.ResponseWriter, r *http.Request) {
	utils.EnableCORS(w) // fix cors issues
	if r.Method != http.MethodGet {
		utils.RespondWithError(w, models.Error{Message: "Method Not Allowed", Code: http.StatusMethodNotAllowed})
		return
	}
	var projects []models.Player
	err := utils.LoadJSON("./storage/scores.json", &projects)
	if err != nil {
		utils.RespondWithError(w, models.Error{Message: "Internal Server Error", Code: http.StatusInternalServerError})
		return
	}
	utils.RespondWithJSON(w, http.StatusOK, projects)
}

func SaveScores(w http.ResponseWriter, r *http.Request) {
	utils.EnableCORS(w) // fix cors issues
	if r.Method != http.MethodPost {
		utils.RespondWithError(w, models.Error{Message: "Method Not Allowed", Code: http.StatusMethodNotAllowed})
		return
	}
	var player models.Player
	if err := json.NewDecoder(r.Body).Decode(&player); err != nil {
		fmt.Println(err)
		utils.RespondWithError(w, models.Error{Message: "Inetrnal Server Error", Code: http.StatusInternalServerError})
		return
	}

	err := utils.SaveJSON("./storage/scores.json", player)
	if err != nil {
		utils.RespondWithError(w, models.Error{Message: "Internal Server Error", Code: http.StatusInternalServerError})
		return
	}
	utils.RespondWithJSON(w, http.StatusOK, player)
}
