export function renderCharts(cities) {
	const chartsContainer = document.getElementById('charts-container')
	chartsContainer.innerHTML = '' // очищаем

	const allCriteria = [
		'стоимость_жизни',
		'здравоохранение',
		'образование',
		'экономика',
		'инфраструктура',
		'экология',
	]

	const criterionTitles = {
		стоимость_жизни: 'Средняя стоимость жизни (руб.)',
		здравоохранение: 'Индекс здравоохранения',
		образование: 'Индекс образования',
		экономика: 'Индекс экономики',
		инфраструктура: 'Индекс инфраструктуры',
		экология: 'Индекс экологии',
	}

	allCriteria.forEach(crit => {
		const section = document.createElement('section')
		section.className = 'chart-box'

		const h4 = document.createElement('h4')
		h4.textContent = criterionTitles[crit] || crit
		section.appendChild(h4)

		const canvas = document.createElement('canvas')
		canvas.id = `chart-${crit}`
		section.appendChild(canvas)

		chartsContainer.appendChild(section)

		const ctx = canvas.getContext('2d')

		// Формируем данные для графика
		let dataSet = []
		switch (crit) {
			case 'стоимость_жизни':
				dataSet = cities.map(
					c =>
						c.стоимость_жизни.проезд +
						c.стоимость_жизни.аренда +
						c.стоимость_жизни.коммуналка
				)
				break
			case 'здравоохранение':
				dataSet = cities.map(
					c =>
						c.здравоохранение.больницы * 0.3 +
						c.здравоохранение.врачи_на_10000 * 0.5 +
						(1 / c.здравоохранение.ожидание_в_днях) * 0.2 * 100
				)
				break
			case 'образование':
				dataSet = cities.map(
					c =>
						c.образование.вузов * 0.3 +
						c.образование.топ_100_вузов * 0.4 +
						c.образование.школ_на_1000 * 0.3
				)
				break
			case 'экономика':
				dataSet = cities.map(
					c =>
						c.экономика.зарплата * 0.5 +
						(100 - c.экономика.безработица_в_процентах) * 10 * 0.3 +
						c.экономика.крупных_предприятий_на_1000 * 100 * 0.2
				)
				break
			case 'инфраструктура':
				dataSet = cities.map(
					c =>
						c.инфраструктура.дорог_в_км * 0.4 +
						c.инфраструктура.метро_в_км * 0.4 +
						c.инфраструктура.аэропортов * 0.2
				)
				break
			case 'экология':
				dataSet = cities.map(c => c.экология.индекс * 10)
				break
			default:
				dataSet = cities.map(() => 0)
		}

		new Chart(ctx, {
			type: 'bar',
			data: {
				labels: cities.map(c => c.город),
				datasets: [
					{
						label: criterionTitles[crit],
						data: dataSet,
						backgroundColor: 'rgba(124, 107, 189, 0.7)',
						borderColor: 'rgba(92, 74, 177, 1)',
						borderWidth: 1,
						hoverBackgroundColor: 'rgba(92, 74, 177, 0.9)',
					},
				],
			},
			options: {
				responsive: true,
				scales: {
					y: { beginAtZero: true },
				},
				plugins: {
					legend: {
						labels: {
							color: '#5a47a3',
							font: { weight: 'bold' },
						},
					},
				},
			},
		})
	})
}
