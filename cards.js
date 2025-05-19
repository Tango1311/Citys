// cards.js

export function renderCities(citiesArr) {
	const container = document.getElementById('cities-container')
	container.innerHTML = ''
	citiesArr.forEach(city => {
		const card = document.createElement('div')
		card.className = 'city-card'

		card.innerHTML = `
		<div class="city-image-wrapper">
		  <img src="${city.фото}" alt="Фото города ${city.город}" class="city-image" />
		  <div class="city-info-overlay">
			<h3>${city.город}</h3>
			<p><b>Средняя стоимость жизни:</b> проезд ${city.стоимость_жизни.проезд} руб., аренда ${city.стоимость_жизни.аренда} руб., коммуналка ${city.стоимость_жизни.коммуналка} руб.</p>
			<p><b>Здравоохранение:</b> больниц ${city.здравоохранение.больницы}, врачи на 10 тыс. чел. ${city.здравоохранение.врачи_на_10000}, ожидание ${city.здравоохранение.ожидание_в_днях} дн.</p>
			<p><b>Образование:</b> вузов ${city.образование.вузов}, ТОП-100 ${city.образование.топ_100_вузов}, школ на 1000 чел. ${city.образование.школ_на_1000}</p>
			<p><b>Экономика:</b> зарплата ${city.экономика.зарплата} руб., безработица ${city.экономика.безработица_в_процентах}%, предприятий ${city.экономика.крупных_предприятий_на_1000}</p>
			<p><b>Инфраструктура:</b> дорог ${city.инфраструктура.дорог_в_км} км, метро ${city.инфраструктура.метро_в_км} км, аэропортов ${city.инфраструктура.аэропортов}</p>
			<p><b>Экология:</b> индекс ${city.экология.индекс}, вода: ${city.экология.вода}</p>
		  </div>
		</div>
		<h3 class="city-name">${city.город}</h3>
	  `

		container.appendChild(card)
	})
}
  

export function renderDynamicTable(
	selectedCriteria,
	citiesArr,
	containerId = 'top-table-container'
) {
	const container = document.getElementById(containerId)
	let table = document.getElementById('dynamic-table')

	if (table) table.remove()

	if (selectedCriteria.length === 0) {
		container.style.display = 'none'
		return
	}

	container.style.display = 'block'

	table = document.createElement('table')
	table.id = 'dynamic-table'
	table.style.width = '100%'
	table.style.borderCollapse = 'collapse'
	table.style.fontSize = '1rem'

	const thead = document.createElement('thead')
	const trHead = document.createElement('tr')

	let th = document.createElement('th')
	th.innerText = 'Город'
	th.style.padding = '10px'
	th.style.textAlign = 'left'
	th.style.backgroundColor = '#7c6bbd'
	th.style.color = 'white'
	trHead.appendChild(th)

	selectedCriteria.forEach(crit => {
		th = document.createElement('th')
		th.innerText =
			{
				стоимость_жизни: 'Средняя стоимость жизни (руб.)',
				здравоохранение: 'Здравоохранение',
				образование: 'Образование',
				экономика: 'Экономика',
				инфраструктура: 'Инфраструктура',
				экология: 'Экология',
			}[crit] || crit
		th.style.padding = '10px'
		th.style.textAlign = 'left'
		th.style.backgroundColor = '#7c6bbd'
		th.style.color = 'white'
		trHead.appendChild(th)
	})

	thead.appendChild(trHead)
	table.appendChild(thead)

	const tbody = document.createElement('tbody')

	citiesArr.forEach(city => {
		const tr = document.createElement('tr')
		tr.style.backgroundColor = '#f3f0ff'

		let td = document.createElement('td')
		td.innerText = city.город
		td.style.padding = '8px'
		tr.appendChild(td)

		selectedCriteria.forEach(crit => {
			td = document.createElement('td')
			td.style.padding = '8px'

			switch (crit) {
				case 'стоимость_жизни':
					td.innerText = `Проезд: ${city.стоимость_жизни.проезд}, Аренда: ${city.стоимость_жизни.аренда}, Коммуналка: ${city.стоимость_жизни.коммуналка}`
					break
				case 'здравоохранение':
					td.innerText = `Больниц: ${city.здравоохранение.больницы}, Врачей: ${city.здравоохранение.врачи_на_10000}, Ожидание: ${city.здравоохранение.ожидание_в_днях} дн.`
					break
				case 'образование':
					td.innerText = `Вузов: ${city.образование.вузов}, ТОП-100: ${city.образование.топ_100_вузов}, Школ: ${city.образование.школ_на_1000}`
					break
				case 'экономика':
					td.innerText = `З/п: ${city.экономика.зарплата} руб., Безработица: ${city.экономика.безработица_в_процентах}%, Предприятий: ${city.экономика.крупных_предприятий_на_1000}`
					break
				case 'инфраструктура':
					td.innerText = `Дорог: ${city.инфраструктура.дорог_в_км} км, Метро: ${city.инфраструктура.метро_в_км} км, Аэропортов: ${city.инфраструктура.аэропортов}`
					break
				case 'экология':
					td.innerText = `Индекс: ${city.экология.индекс}, Вода: ${city.экология.вода}`
					break
				default:
					td.innerText = '-'
			}

			tr.appendChild(td)
		})

		tbody.appendChild(tr)
	})

	table.appendChild(tbody)
	container.appendChild(table)
}
