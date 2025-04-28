package main

import (
	"fmt"
	"log"
	"net/http"
	"portfolio-api/handlers"
	"portfolio-api/routers"
)

func main() {
	mux := routers.NewRouter()
	mux.HandleFunc("/api/projects", handlers.GetProjects)
	fmt.Println("server is running on port 8080 >>> http://localhost/8080")
	log.Fatal(http.ListenAndServe(":8080", mux))
}
