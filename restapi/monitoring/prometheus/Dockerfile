FROM prom/prometheus
ADD ./prometheus.yml /etc/prometheus
ADD ./prometheus.sh /
CMD [ "bash", "prometheus.sh" ]