up:
	docker compose -f devops/docker-compose.local.yml --project-name maximum up --build -d
down:
	docker compose -f devops/docker-compose.local.yml --project-name maximum down