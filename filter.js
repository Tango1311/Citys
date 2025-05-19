// filter.js
import { normalize } from './data.js' // убрал cities из импорта — массив теперь передаётся параметром

export function calculateNormalizers(citiesArr, selectedCriteria) {
	const normalizers = {}

	selectedCriteria.forEach(crit => {
		let values = []
		switch (crit) {
			case 'стоимость_жизни':
				values = citiesArr.map(
					c =>
						c.стоимость_жизни.проезд +
						c.стоимость_жизни.аренда +
						c.стоимость_жизни.коммуналка
				)
				normalizers[crit] = {}
				normalize(values, true).forEach(
					(v, i) => (normalizers[crit][citiesArr[i].город] = v)
				)
				break

			case 'здравоохранение':
				values = citiesArr.map(
					c =>
						c.здравоохранение.больницы * 0.3 +
						c.здравоохранение.врачи_на_10000 * 0.5 +
						(1 / c.здравоохранение.ожидание_в_днях) * 0.2 * 100
				)
				normalizers[crit] = {}
				normalize(values).forEach(
					(v, i) => (normalizers[crit][citiesArr[i].город] = v)
				)
				break

			case 'образование':
				values = citiesArr.map(
					c =>
						c.образование.вузов * 0.3 +
						c.образование.топ_100_вузов * 0.5 +
						c.образование.школ_на_1000 * 0.2
				)
				normalizers[crit] = {}
				normalize(values).forEach(
					(v, i) => (normalizers[crit][citiesArr[i].город] = v)
				)
				break

			case 'экономика':
				values = citiesArr.map(
					c =>
						c.экономика.зарплата * 0.5 +
						(100 - c.экономика.безработица_в_процентах) * 10 * 0.3 +
						c.экономика.крупных_предприятий_на_1000 * 100 * 0.2
				)
				normalizers[crit] = {}
				normalize(values).forEach(
					(v, i) => (normalizers[crit][citiesArr[i].город] = v)
				)
				break

			case 'инфраструктура':
				values = citiesArr.map(
					c =>
						c.инфраструктура.дорог_в_км * 0.4 +
						c.инфраструктура.метро_в_км * 0.3 +
						c.инфраструктура.аэропортов * 0.2
				)
				normalizers[crit] = {}
				normalize(values).forEach(
					(v, i) => (normalizers[crit][citiesArr[i].город] = v)
				)
				break

			case 'экология':
				values = citiesArr.map(c => c.экология.индекс * 10)
				normalizers[crit] = {}
				normalize(values).forEach(
					(v, i) => (normalizers[crit][citiesArr[i].город] = v)
				)
				break
		}
	})

	return normalizers
}

export function scoreCity(city, selectedCriteria, normalizers) {
	let score = 0
	selectedCriteria.forEach(crit => {
		if (normalizers[crit] && normalizers[crit][city.город] !== undefined) {
			score += normalizers[crit][city.город]
		} else {
			score += 0
		}
	})
	return score
}
