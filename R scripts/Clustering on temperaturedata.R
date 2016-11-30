# reading the data
library(RMongo)
mg1 <- mongoDbConnect('db')
print(dbShowCollections(mg1))
query <- dbGetQuery(mg1, 'pickdata', "{'temperature': {'$gte': 0}, 'date_time': {'$gte': 0}}")
utilities <- query[c('temperature', 'date_time')]
summary(utilities)

#utilities <- read.csv("C:/Users/Jay/Desktop/temperaturedata.csv")
# plot the graph
plot(temperature ~ date_time, utilities)

# trimming required data
z <- utilities[]
a<- utilities[,-c(1,1)]
b<- print(a,digits = 0)

#finding distance of each point from one another
distance <- suppressWarnings(dist(z))

#applying hierarchical clustering on the data
hc.c <- hclust(distance)

#plotting the dendogram of the hierarchical clustering output
plot(hc.c)


#plotting the hierarchical clustering data
member.c <- cutree(hc.c,2)
suppressWarnings(clusplot(z, member.c, color = TRUE, shade = TRUE, labels = utilities$date_time, lines = 0))
