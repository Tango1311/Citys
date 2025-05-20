import { cities } from './data.js'
import { calculateNormalizers, scoreCity } from './filter.js'
import { renderCities, renderDynamicTable } from './cards.js'
import { renderCharts } from './charts.js' // Импорт функции renderCharts

document.addEventListener('DOMContentLoaded', () => {
	const chartsContainer = document.getElementById('charts-container')
	let chartInstances = []

	function clearCharts() {
		chartInstances.forEach(ch => ch.destroy())
		chartInstances = []
		chartsContainer.innerHTML = ''
	}

	function applyFilters() {
		const checkboxes = document.querySelectorAll(
			'.filter-container input[type="checkbox"]'
		)
		const selectedCriteria = Array.from(checkboxes)
			.filter(cb => cb.checked)
			.map(cb => cb.value)

		if (selectedCriteria.length === 0) {
			renderCities(cities)
			renderDynamicTable([], cities)
			renderCharts(cities) // показываем все графики по всем городам
			return
		}

		// Считаем нормализаторы по всем городам и выбранным критериям
		const normalizers = calculateNormalizers(cities, selectedCriteria)

		// Считаем score для каждого города
		const scoredCities = cities.map(city => ({
			city,
			score: scoreCity(city, selectedCriteria, normalizers),
		}))

		// Сортируем по score по убыванию
		scoredCities.sort((a, b) => b.score - a.score)

		// Берём только объекты городов в порядке сортировки
		const sortedCities = scoredCities.map(obj => obj.city)

		// Отрисовываем
		renderCities(sortedCities)
		renderDynamicTable(selectedCriteria, sortedCities)
		renderCharts(sortedCities)
	}
	

	document.getElementById('reset-filters').addEventListener('click', () => {
		document
			.querySelectorAll('.filter-container input[type="checkbox"]')
			.forEach(cb => (cb.checked = false))
		applyFilters()
	})

	document
		.querySelectorAll('.filter-container input[type="checkbox"]')
		.forEach(cb => {
			cb.addEventListener('change', applyFilters)
		})

	// Инициализация страницы:
	renderCities(cities)
	renderDynamicTable([], cities)
	renderCharts(cities) // сразу показываем все графики
	renderConclusion() // <-- добавляем вывод текста
})

function renderConclusion() {
	const conclusionContainer = document.getElementById('conclusion')
	conclusionContainer.innerHTML = `
	  <h2>Итоги исследования</h2>
	  <p>Мы сравнили десять крупных городов России по важным критериям — стоимости жизни, здравоохранению, образованию, экономике, инфраструктуре и экологии. На сайте представлены карточки с основными данными по каждому городу, таблицы и графики, которые показывают, как города отличаются друг от друга.</p>
	  <p>Теперь вы можете быстро увидеть сильные и слабые стороны каждого города по каждому критерию и выбрать именно то место, которое подходит вам больше всего. Фильтры помогают отсортировать города по вашим предпочтениям, а графики дают наглядное представление о ситуации.</p>
	  <p>Этот инструмент поможет вам сделать осознанный выбор, основываясь на реальных данных и удобной визуализации.</p>
	`
}
  
