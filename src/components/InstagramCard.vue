<template>
	<div class="card text-center">
		<div class="card-header">{{ info.title }}</div>
		<div class="card-body p-0">
			<img class="card-img-top" :src="info.url" />
		</div>
		<div class="card-footer text-muted small">
			{{ info.date  }}
			<br />
			{{ info.explanation }}
		</div>
	</div>
</template>

<script>
import {format, parseISO} from 'date-fns';
export default {
	props: ["info"],
  name: "InstagramCard",
  
  filters: {
		shortDate: function (value) {
			return format(value, parseISO('dd.MM.yyyy'));
		},
	},
};
</script>

<style lang="scss" >
.card-header,
.card-footer,
.card {
	text-align: left;
	border: 0;
}
.card {
	padding: 1pt;
}

// img {
//   border-radius: 10% !important;
// }
</style>
