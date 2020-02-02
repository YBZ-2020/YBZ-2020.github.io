window.pepe = new Vue({
	el: '#app',
	name: 'app',
	reload: false,
	data: function () {
		return {
			options: {
				licenseKey: null,
				afterLoad: this.afterLoad,
				scrollBar: false,
				menu: '#menu',
				navigation: true,
				anchors: ['pay'],
				sectionsColor: ['#41b883']
			},
			paymodule: {
				actionitem: 0,
				salelist: null
			}
		}
	},
	computed: {
		salelist: {
			get: function () {
				console.log('salelist.get');
				console.log(this.salelist);
				return this.paymodule.salelist;
			},
			set: function (e) {
				console.log('salelist.set');
				this.paymodule.salelist = e;
			}
		}
	},
	methods: {
		afterLoad: function () {
			console.log('After load')
			this.salelist = [
				{time: 10, price: 1},
				{time: 20, price: 2},
				{time: 30, price: 3},
				{time: 40, price: 4},
				{time: 50, price: 5},
				{time: 60, price: 6},
				{time: 90, price: 9},
				{time: 120, price: 12}
			];
		},
		selPayItem: function (id) {
			this.paymodule.actionitem = id;
		},

		addSection: function (e) {
			e.preventDefault()
			var newSectionNumber = document.querySelectorAll('.fp-section').length + 1

			// creating the section div
			var section = document.createElement('div')
			section.className = 'section'
			section.innerHTML = '<h3>Section' + newSectionNumber + '</h3>'

			// adding section
			document.querySelector('#fullpage').appendChild(section)

			// creating the section menu element
			var sectionMenuItem = document.createElement('li')
			sectionMenuItem.setAttribute('data-menuanchor', 'page' + newSectionNumber)
			sectionMenuItem.innerHTML = '<a href="#page${newSectionNumber}">Section ' + newSectionNumber + '</a>'

			// adding it to the sections menu
			var sectionsMenuItems = document.querySelector('#menu')
			sectionsMenuItems.appendChild(sectionMenuItem)

			// adding anchor for the section
			this.options.anchors.push('page' + newSectionNumber)

			// we have to call `update` manually as DOM changes won't fire updates
			// requires the use of the attribute ref="fullpage" on the
			// component element, in this case, <full-page>
			// ideally, use an ID element for that element too
			this.$refs.fullpage.build()
		},
		removeSection: function () {
			var sections = document.querySelector('#fullpage').querySelectorAll('.fp-section')
			var lastSection = sections[sections.length - 1]

			// removing the last section
			lastSection.parentNode.removeChild(lastSection)

			// removing the last anchor
			this.options.anchors.pop()

			// removing the last item on the sections menu
			var sectionsMenuItems = document.querySelectorAll('#menu li')
			var lastItem = sectionsMenuItems[sectionsMenuItems.length - 1]
			lastItem.parentNode.removeChild(lastItem)
		},
		toggleNavigation: function () {
			this.options.navigation = !this.options.navigation
		},
		toggleScrollbar: function () {
			this.options.scrollBar = !this.options.scrollBar
		}
	}
})

