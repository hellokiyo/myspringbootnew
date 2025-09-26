import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Calendar, Clock, MapPin, Users, Bell, Plus } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  attendees: number;
  maxAttendees?: number;
  imageUrl: string;
  price?: string;
}

const sampleEvents: Event[] = [
  {
    id: '1',
    title: '홍대 거리 예술 축제',
    description: '매주 토요일 열리는 거리 예술가들의 축제입니다.',
    date: '2024-03-30',
    time: '14:00',
    location: '홍대 걷고싶은거리',
    category: '축제',
    attendees: 45,
    maxAttendees: 100,
    imageUrl: 'https://images.unsplash.com/photo-1758030306457-e54f25fe4384?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBhcnQlMjBtdXJhbHxlbnwxfHx8fDE3NTg3NzQ3MTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    price: '무료'
  },
  {
    id: '2',
    title: '현대미술 갤러리 투어',
    description: '전문 큐레이터와 함께하는 갤러리 투어',
    date: '2024-04-05',
    time: '11:00',
    location: '강남구 갤러리 거리',
    category: '투어',
    attendees: 12,
    maxAttendees: 20,
    imageUrl: 'https://images.unsplash.com/photo-1713779490284-a81ff6a8ffae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBnYWxsZXJ5JTIwZXhoaWJpdGlvbnxlbnwxfHx8fDE3NTg3NDI0Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    price: '15,000원'
  },
  {
    id: '3',
    title: '지역 작가 워크숍',
    description: '도자기 만들기 체험 워크숍',
    date: '2024-04-12',
    time: '10:00',
    location: '마포구 문화센터',
    category: '워크숍',
    attendees: 8,
    maxAttendees: 15,
    imageUrl: 'https://images.unsplash.com/photo-1654870574819-ee447f65112d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3QlMjB3b3Jrc3BhY2UlMjBzdHVkaW98ZW58MXx8fHwxNzU4NzQzNjY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    price: '25,000원'
  }
];

export function EventCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState(sampleEvents);
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('list');

  const handleJoinEvent = (eventId: string) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId && event.maxAttendees && event.attendees < event.maxAttendees
        ? { ...event, attendees: event.attendees + 1 }
        : event
    ));
  };

  const upcomingEvents = events.filter(event => new Date(event.date) >= new Date());

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">동네 예술 행사 달력</h2>
            <p className="text-gray-600">매달 열리는 다양한 예술 행사를 확인하세요</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              알림 설정
            </Button>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              <Plus className="w-4 h-4 mr-2" />
              행사 등록
            </Button>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2 mb-4">
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            목록 보기
          </Button>
          <Button
            variant={viewMode === 'calendar' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('calendar')}
          >
            달력 보기
          </Button>
        </div>
      </div>

      {/* Calendar View Placeholder */}
      {viewMode === 'calendar' && (
        <Card>
          <CardContent className="p-6">
            <div className="h-96 bg-gradient-to-br from-indigo-50 to-purple-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Calendar className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">달력 뷰</h3>
                <p className="text-gray-500">월별 일정을 한눈에 확인하세요</p>
                <div className="mt-4 grid grid-cols-7 gap-2 max-w-sm mx-auto">
                  {Array.from({ length: 28 }, (_, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 flex items-center justify-center text-sm rounded ${
                        i === 7 || i === 14 || i === 21 ? 'bg-purple-500 text-white' : 'bg-white text-gray-600'
                      }`}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Event List */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">다가오는 행사</h3>
          {upcomingEvents.map((event) => (
            <Card key={event.id} className="hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3">
                  <div className="aspect-video md:aspect-square bg-gray-200">
                    <ImageWithFallback
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-full object-cover rounded-l-lg"
                    />
                  </div>
                </div>
                <div className="md:w-2/3 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">{event.category}</Badge>
                        {event.price && (
                          <Badge variant="outline">{event.price}</Badge>
                        )}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                      <p className="text-gray-600 mb-4">{event.description}</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(event.date).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        weekday: 'long'
                      })}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-2" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="w-4 h-4 mr-2" />
                      {event.attendees}명 참여
                      {event.maxAttendees && ` / ${event.maxAttendees}명`}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        상세보기
                      </Button>
                      <Button variant="outline" size="sm">
                        <Bell className="w-4 h-4 mr-1" />
                        알림
                      </Button>
                    </div>
                    <Button
                      onClick={() => handleJoinEvent(event.id)}
                      disabled={event.maxAttendees ? event.attendees >= event.maxAttendees : false}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      {event.maxAttendees && event.attendees >= event.maxAttendees ? '마감' : '참여하기'}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            알림 설정
          </CardTitle>
          <CardDescription>
            관심 있는 지역과 카테고리를 설정하면 새로운 행사 소식을 받아볼 수 있습니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['홍대', '강남', '마포구', '종로구'].map((area) => (
              <Button key={area} variant="outline" size="sm">
                {area}
              </Button>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
            {['축제', '워크숍', '전시', '투어'].map((category) => (
              <Button key={category} variant="outline" size="sm">
                {category}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}