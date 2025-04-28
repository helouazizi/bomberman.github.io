package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"portfolio-api/models"
	"portfolio-api/utils"
)

func GetScores(w http.ResponseWriter, r *http.Request) {
	utils.EnableCORS(w) // fix cors issues
	if r.Method != http.MethodGet {
		utils.RespondWithError(w, models.Error{Message: "Method Not Allowed", Code: http.StatusMethodNotAllowed})
		return
	}
	var players []models.Player
	err := utils.LoadJSON("./storage/scores.json", &players)
	if err != nil {
		utils.RespondWithError(w, models.Error{Message: "Internal Server Error", Code: http.StatusInternalServerError})
		return
	}
	// lets sort thr players

	utils.RespondWithJSON(w, http.StatusOK, players)
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
	if player.Name == "" || player.Score < 0 {
		utils.RespondWithError(w, models.Error{Message: "Bad Request", Code: http.StatusBadRequest})
		return
	}
	player.Time = time.Now().Format(time.DateTime)

	err := utils.SaveJSON("./storage/scores.json", player)
	if err != nil {
		utils.RespondWithError(w, models.Error{Message: "Internal Server Error", Code: http.StatusInternalServerError})
		return
	}
	utils.RespondWithJSON(w, http.StatusOK, player)
}
